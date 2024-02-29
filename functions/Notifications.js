const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production==="true" ? require("./service-production.json") : require("./service-development.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();
const UsersCollection = admin.firestore().collection("Users");
const Messaging = admin.messaging();

// firebase deploy --only functions:Notifications
// firebase deploy --only functions:Notifications-UserNotificationWrite
exports.UserNotificationWrite = functions.firestore
  .document("Users/{UserId}/Notifications/{NotificationId}")
  .onCreate(async (notification, context) => {
    const { params: { NotificationId, UserId } } = context;
    const data = notification.data();

    if (!data) {
      functions.logger.log("No data to send notification");
      return false;
    }

    try {
      const snapshot = await UsersCollection.doc(UserId).get();
      const user = snapshot.data();

      const updateNotification = {};
      updateNotification[`notifications.${data.type}`] = admin.firestore.FieldValue.increment(1);
      await UsersCollection.doc(UserId).update(updateNotification);

      if (!user) {
        throw new Error("User data not found");
      }

      // User does NOT allow notifications
      if (user.permissions?.notifications === false) {
        functions.logger.log("User has disabled notifications for ID: ", NotificationId);
        await updateNotificationResponse(UserId, NotificationId, {
          id: NotificationId,
          status: "failed",
          message: "Notifications disabled by user",
        });
        return false;
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
            actions: [],
          },
          fcmOptions: {
            link: "",
          },
        },
      };

      if (data.goTo) {
        messagePayload.data.goTo = data.goTo;
      }

      let response;
      if (user.notificationDeviceToken && user.notificationDeviceToken.length > 2) {
        messagePayload.token = user.notificationDeviceToken;
        response = await Messaging.send(messagePayload);
      } else if (user.notificationWebToken && user.notificationWebToken.length > 2) {
        messagePayload.token = user.notificationWebToken;
        response = await Messaging.send(messagePayload);
        await UsersCollection.doc(UserId).update({
          notifications: { hasNotifications: true },
          has: { notifications: true },
        });
      }

      if (response) {
        const messageId = response.split(/[/]+/).pop();
        await updateNotificationResponse(UserId, NotificationId, {
          id: NotificationId,
          deviceResponse: { messageId, status: "success" },
        });
        return true;
      }

      return false;
    } catch (error) {
      functions.logger.error("Error sending notification: ", error);
      return false;
    }
  });


// firebase deploy --only functions:Notifications-UserNotificationOnWrite 
exports.UserNotificationOnWrite = functions.firestore
  .document("Users/{UserId}/Notifications/{NotificationId}")
  .onWrite(async (change, context) => {
    const { UserId } = context.params;

    const before = change.before.exists ? change.before.data() : null;
    const after = change.after.exists ? change.after.data() : null;

    //if (!before && after) return;

    try {
      if (after.seen !== before.seen) {
        const userRef = db.doc(`Users/${UserId}`);
        const userDoc = await userRef.get()
        const userData = userDoc.data();

        const updateNotification = {};
        updateNotification[`notifications.${after.type}`] = admin.firestore.FieldValue.increment(
          after.seen ? (userData.notifications[after.type] > 0 ? -1 : 0) : 1
        );

        await userRef.update(updateNotification);
      }

      return null;
    } catch (error) {
      console.error("Error in UserNotificationOnWrite function:", error);
      return null;
    }
  });
 

// Update the notification
/**
 * @param {*} UserId
 * @param {*} NotificationId
 * @param {FirebaseFirestore.UpdateData|string} payload
 * @return {Promise}
 */
async function updateNotificationResponse(UserId, NotificationId, payload) {
  payload.created_at = new Date();
  return await db.doc(`Users/${UserId}/Notifications/${NotificationId}`)
      .update(payload)
      .then(() => {
        return Promise.resolve(true);
      }).catch((error) => {
        functions.logger.log("UPDATE DOC ERROR", error);
        return Promise.resolve(false);
      });
}
