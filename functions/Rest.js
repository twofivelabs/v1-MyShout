const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");
// const got = require("got");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


/**
 * firebase deploy --only functions:Rest
 * firebase deploy --only functions:Rest-updateGPS
 *
 * data {
 *     user,
 *     gps
 * }
 * @type {HttpsFunction & Runnable<any>}
 */
exports.updateGPS = functions.https.onCall((data) => {
  try {
    if (data) {
      const userId = data.userId;
      const gps = data.gps;

      functions.logger.log("USER LOG", userId);
      functions.logger.log("GPS LOG", gps);
      // data.data.gps.lat  data.data.gps.lng
      return admin.firestore()
          .doc(`Users/${userId}`)
          .set({
            gps: {
              lng: 50,
              lat: -100,
              geoHash: "aa",
              updated_at: new Date(),
            },
          }, {merge: true}).then(() => {
            return Promise.resolve(true);
          }).catch((e) => {
            functions.logger.log("Error updating GPS data", e);
            return Promise.resolve(false);
          });
    }
    return Promise.resolve(false);
  } catch (e) {
    functions.logger.log("Error updating GPS data 2", e);
    return Promise.resolve(false);
  }
});
