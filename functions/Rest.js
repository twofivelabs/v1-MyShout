const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production ? require("./service-production.json") : require("./service-development.json");
const {geohashForLocation} = require("geofire-common");
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

      if (!userId || !gps) return;

      const hash = geohashForLocation([gps.lat, gps.lng]);

      functions.logger.log("USER LOG2", userId);
      functions.logger.log("GPS LOG2", gps);
      // data.data.gps.lat  data.data.gps.lng
      return admin.firestore()
          .doc(`Users/${userId}`)
          .set({
            gps: {
              lng: gps.lng,
              lat: gps.lat,
              geoHash: hash,
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
