const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();
const UsersCollection = admin.firestore().collection("Users");
const Messaging = admin.messaging();

// firebase deploy --only functions:Notifications-UserNotificationWrite
exports.UserNotificationWrite = functions.firestore
    .document("Users/{UserId}/Notifications/{NotificationId}")
    .onCreate((notification, context) => {
      const {
        params: {
          NotificationId,
          UserId,
        },
      } = context;
      const data = notification.data();
      functions.logger.log(data, NotificationId);

      if (data) {
        let user;

        // Get User Data
        return UsersCollection.doc(UserId).get().then((snapshot) => {
          user = snapshot.data();

          // User does NOT allow notifications
          if (user.permissions.notifications === false) {
            functions.logger.log("User has disabled notifications for ID: ", NotificationId);
            return updateNotificationResponse(UserId, NotificationId, {
              id: NotificationId,
              status: "failed",
              message: "Notifications disabled by user",
            }).then(() => {
              return Promise.resolve(true);
            }).catch(() => {
              functions.logger.log("Not able to update notification: ", NotificationId);
              return Promise.resolve(false);
            });
          }

          const messagePayload = {
            name: "UserNotification",
            fcmOptions: {},
            token: user.notificationDeviceToken,
            data: {
              id: NotificationId,
            },
            notification: {
              title: data.title,
              body: data.body,
            },
            apns: {
              payload: {
                aps: {
                  "mutable-content": 1,
                },
              },
            },
            webpush: {
              notification: {
                // Adds actions to the push notification
                actions: [],
              },
              fcmOptions: {
                // Adds a link to be opened when clicked on the push notification
                link: "",
              },
            },
          };
          if (data.goTo) {
            messagePayload.data.goTo = data.goTo;
          }
          functions.logger.log("Notify User ", user.username, " With Token 2: ", messagePayload.token);

          // Device notification
          if (user.notificationDeviceToken && user.notificationDeviceToken.length > 2) {
            // Send message to device
            messagePayload.token = user.notificationDeviceToken;
            functions.logger.log("Notification > Device Payload Token 3:", messagePayload.token);
            return Messaging.send(messagePayload)
                .then((response) => {
                  // Response is a message ID string.
                  return updateNotificationResponse(UserId, NotificationId, {
                    id: NotificationId,
                    deviceResponse: {
                      messageId: response.split(/[/]+/).pop(),
                      status: "success",
                    },
                  }).then(() => {
                    // Update user profile with "HAS NOTIFICATIONS"
                    UsersCollection.doc(UserId).update({
                      "notifications.hasMessages": true,
                      "has.notifications": true,
                    }).catch((e) => console.log("UPDATING USER WITH HAS MESSAGES", e) );

                    return Promise.resolve(true);
                  }).catch((e) => {
                    functions.logger.log("updateNotificationResponse: error", e);
                    return Promise.resolve(false);
                  });
                })
                .catch((e) => {
                  functions.logger.log("Error sending notification: ", e);
                  return Promise.resolve(false);
                });
          }

          // Browser notification
          if (user.notificationWebToken && user.notificationWebToken.length > 2) {
            messagePayload.token = user.notificationWebToken;
            functions.logger.log("Notification > Browser Payload:", messagePayload);
            return Messaging.send(messagePayload)
                .then((response) => {
                  updateNotificationResponse(UserId, NotificationId, {
                    id: NotificationId,
                    webResponse: {
                      messageId: response.split(/[/]+/).pop(),
                      status: "success",
                    },
                  }).then(() => {
                    // Update user profile with "HAS NOTIFICATIONS"
                    UsersCollection.doc(UserId).update({
                      notifications: {
                        hasNotifications: true,
                      },
                      has: {
                        notifications: true,
                      },
                    }).catch((e) => console.log("UPDATING USER WITH HAS MESSAGES", e) );

                    return Promise.resolve(true);
                  }).catch((e) => {
                    functions.logger.log("updateNotificationResponse: error", e);
                    return Promise.resolve(false);
                  });
                })
                .catch((e) => {
                  functions.logger.log("Error sending notification: ", e);
                  return Promise.resolve(false);
                });
          }
        });
      }

      functions.logger.log("No data to send notification");
      return Promise.resolve(false);
    });

// Update the notification
/**
 * @param {*} UserId
 * @param {*} NotificationId
 * @param {FirebaseFirestore.UpdateData|string} payload
 * @return {Promise}
 */
function updateNotificationResponse(UserId, NotificationId, payload) {
  payload.created_at = new Date();
  return db.doc(`Users/${UserId}/Notifications/${NotificationId}`)
      .update(payload)
      .then(() => {
        return Promise.resolve(true);
      }).catch((error) => {
        functions.logger.log("UPDATE DOC ERROR", error);
        return Promise.resolve(false);
      });
}
