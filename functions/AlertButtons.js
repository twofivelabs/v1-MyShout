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
  .onCreate(async (alert, context) => {
    const { params: { AlertId, UserId } } = context;
    const dataAlert = alert.data();

    if (!dataAlert) {
      functions.logger.log("No data to send alert");
      return false;
    }

    try {
      // UPDATE ALERT WITH LOCATION
      const userResponse = await admin.firestore().doc(`Users/${UserId}`).get();
      const user = userResponse.data();

      if (!user || !user.gps) {
        functions.logger.log("NewAlertWrite > ERROR > no GPS");
        return false;
      }

      const locationResponse = await reverseGeolocation(user.gps);
      await db.doc(`Users/${UserId}/Alerts/${AlertId}`).update({
        location: locationResponse,
      });

      functions.logger.log("Alert location updated:", locationResponse);

      // GET USER FRIENDS AND SEND NOTIFICATION
      const friendDocs = await admin.firestore().collection(`Users/${UserId}/Friends`).where("isEmergency", "==", true).get();

      await Promise.all(friendDocs.docs.map(async (doc) => {
        const u = doc.data();
        u.id = doc.id;
        functions.logger.log("NewAlertWrite > Friend > ", u);
        functions.logger.log(`NewAlertWrite > ALERT FRIEND OF > ${dataAlert.type} alert`);

        // ADD NOTIFICATION TO USER DOC
        try {
          await admin.firestore().collection(`Users/${u.id}/Notifications`).add({
            uid: u.id,
            title: `${dataAlert.type} alert`,
            body: `This is an emergency alarm from ${user.username} **${dataAlert.type} alert**.`,
            goTo: `/users/user/${UserId}`,
            type: "alert",
            created_at: new Date(),
            seen: false,
          });
          functions.logger.log("Notification added successfully");
        } catch (error) {
          functions.logger.error("NewAlertWrite > AddNotification > ERROR > ", error);
        }
      }));

      return true;
    } catch (error) {
      functions.logger.error("Error processing alert:", error);
      return false;
    }
  });



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
