const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production==="true" ? require("./service-production.json") : require("./service-development.json");
const got = require("got");
const lodash = require("lodash");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();
const GOOGLE_MAPS_API_KEY = functions.config().google.maps_api_key;


/**
 * firebase deploy --only functions:AlertButtons
 * firebase deploy --only functions:AlertButtons-sendAlert
 *
 * data {
 *     user,
 *     gps
 * }
 * @type {HttpsFunction & Runnable<any>}
 */
exports.sendAlert = functions.https.onCall((data) => {
  try {
    if (data) {
      functions.logger.log("USER LOG", data.data.user);
      functions.logger.log("GPS LOG", data.data.gps);
      // data.data.gps.lat  data.data.gps.lng
      admin.firestore()
          .collection(`Users/${data.data.user.id}/Friends`)
          .where("isEmergency", "==", true)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              functions.logger.log(doc, doc.data());
              const u = doc.data();
              u.id = doc.id;
              functions.logger.log("USER LOG 2", u);

              // ADD SMS TO USER DOC
              /* admin.firestore()
                  .collection(`Users/${u.id}/SMS`)
                  .add({
                    uid: u.id,
                    title: `**${data.type} alert**.`,
                    body: `This is an emergency alarm from ${data.data.user.username} **${data.type} alert**.`,
                    // title: `${data.type} alert from @${data.data.user.username}`,
                    // body: "Please check-in with them!",
                    goTo: `/users/user/${data.data.user.id}`,
                    created_at: new Date(),
                  })
                  .then(() => {
                    functions.logger.log("Added Notification to user");
                  }); */

              // ADD NOTIFICATION TO USER DOC
              admin.firestore()
                  .collection(`Users/${u.id}/Notifications`)
                  .add({
                    uid: u.id,
                    title: `${data.type} alert`,
                    body: `This is an emergency alarm from ${data.data.user.username} **${data.type} alert**.`,
                    goTo: `/users/user/${data.data.user.id}`,
                    type: "alert",
                    created_at: new Date(),
                    seen: false,
                  }).then(() => {
                    return Promise.resolve(true);
                  }).catch(() => {
                    functions.logger.error("ALERT > Add Notification Error", u);
                    return Promise.resolve(false);
                  });
            });
          });
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (e) {
    console.log(e);
    return Promise.resolve(false);
  }
});

// firebase deploy --only functions:AlertButtons
// firebase deploy --only functions:AlertButtons-NewAlertWrite
exports.NewAlertWrite = functions.firestore
    .document("Users/{UserId}/Alerts/{AlertId}")
    .onCreate((alert, context) => {
      const {
        params: {
          AlertId,
          UserId,
        },
      } = context;
      const data = alert.data();
      const dataAlert = alert.data();
      functions.logger.log(data, alert);

      if (data) {
        let user;

        // UPDATE ALERT WITH LOCATION
        admin.firestore()
            .doc(`Users/${UserId}`)
            .get()
            .then((response) => {
              user = response.data();
              functions.logger.log("NewAlertWrite > USER > ", user);
              if (!user || !user.gps) {
                functions.logger.log("NewAlertWrite > ERROR > no GPS");
                return Promise.resolve(false);
              }

              reverseGeolocation(user.gps).then((response) => {
                return db.doc(`Users/${UserId}/Alerts/${AlertId}`)
                    .update({
                      location: response,
                    })
                    .then(() => {
                      return Promise.resolve(true);
                    })
                    .catch((e) => {
                      functions.logger.log("UPDATE ALERT DOC ERROR", e);
                      return Promise.resolve(false);
                    });
              }).catch((e) => {
                functions.logger.log("NewAlertWrite > ERROR > reverseGeolocation", e);
                return Promise.resolve(false);
              });
            });

        // GET USER FRIENDS AND SEND NOTIFICATION
        admin.firestore()
            .collection(`Users/${UserId}/Friends`)
            .where("isEmergency", "==", true)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                const u = doc.data();
                u.id = doc.id;
                functions.logger.log("NewAlertWrite > Friend > ", u);
                functions.logger.log(`NewAlertWrite > ALERT FRIEND OF > ${dataAlert.type} alert`);

                // ADD NOTIFICATION TO USER DOC
                admin.firestore()
                    .collection(`Users/${u.id}/Notifications`)
                    .add({
                      uid: u.id,
                      title: `${dataAlert.type} alert`,
                      body: `This is an emergency alarm from ${user.username} **${dataAlert.type} alert**.`,
                      goTo: `/users/user/${UserId}`,
                      type: "alert",
                      created_at: new Date(),
                      seen: false,
                    }).then(() => {
                      return Promise.resolve(true);
                    }).catch((e) => {
                      functions.logger.log("NewAlertWrite > AddNotification > ERROR > ", e);
                      return Promise.resolve(false);
                    });
              });
            });

        return Promise.resolve(true);
      }

      functions.logger.log("No data to send alert");
      return Promise.resolve(false);
    });


// firebase deploy --only functions:AlertButtons
// firebase deploy --only functions:AlertButtons-UserNotificationWrite
/*
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
        UsersCollection.doc(UserId).get().then((snapshot) => {
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
              return Promise.resolve(false);
            });
          }

          const messagePayload = {
            name: "UserNotification",
            data: {
              id: NotificationId,
            },
            notification: {
              title: data.title,
              body: data.body,
            },
            android: {
              notification: {
                imageUrl: null,
              },
            },
            apns: {
              payload: {
                aps: {
                  "mutable-content": 1,
                },
              },
              fcmOptions: {
                image: null,
              },
            },
            webpush: {
              headers: {
                image: null,
              },
              notification: {
              // Adds actions to the push notification
                actions: [],
              },
              fcmOptions: {
              // Adds a link to be opened when clicked on the push notification
                link: null,
              },
            },
            fcmOptions: {},
            token: user.notificationDeviceToken,
          };
          if (data.goTo) {
            messagePayload.data.goTo = data.goTo;
          }

          // Device notification
          if (user.notificationDeviceToken && user.notificationDeviceToken.length > 2) {
          // Send message to device
            messagePayload.token = user.notificationDeviceToken;
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
                    return Promise.resolve(true);
                  }).catch(() => {
                    return Promise.resolve(false);
                  });
                })
                .catch(() => {
                  return Promise.resolve(false);
                });
          }

          // Browser notification
          if (user.notificationWebToken && user.notificationWebToken.length > 2) {
            messagePayload.token = user.notificationWebToken;
            return Messaging.send(messagePayload)
                .then((response) => {
                  updateNotificationResponse(UserId, NotificationId, {
                    id: NotificationId,
                    webResponse: {
                      messageId: response.split(/[/]+/).pop(),
                      status: "success",
                    },
                  }).then(() => {
                    return Promise.resolve(true);
                  }).catch(() => {
                    return Promise.resolve(false);
                  });
                })
                .catch(() => {
                  return Promise.resolve(false);
                });
          }
        });
      }
    });
*/


// eslint-disable-next-line require-jsdoc
function reverseGeolocation(data) {
  functions.logger.log("*** reverseGeolocation > START");
  if (data && data.lat && data.lng) {
    functions.logger.log("*** reverseGeolocation > GOT");
    return got
        .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${GOOGLE_MAPS_API_KEY}`)
        .json()
        .then((response) => {
          functions.logger.log("*** reverseGeolocation > response > ", response);
          if (response.results) {
            const comp = lodash.chain(response.results[0].address_components)
                .keyBy("types[0]")
                .mapValues("short_name")
                .value();
            functions.logger.log("*** reverseGeolocation > LODASH > ", comp);
            return Promise.resolve({
              country: comp.country,
              province: comp.administrative_area_level_1,
              city: comp.locality,
              postal: comp.postal_code,
            });
          }
          return Promise.resolve(false);
        })
        .catch((error) => {
          functions.logger.log("*** reverseGeolocation > ERROR", error);
          return Promise.resolve(false);
        });
  }
  return Promise.resolve(false);
}
