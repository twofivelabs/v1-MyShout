const functions = require("firebase-functions");
const admin = require("firebase-admin");
const got = require("got");
const serviceAccount = require("./service-key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const GOOGLE_MAPS_API_KEY = "AIzaSyBAD2Twrykrl6E3PmuTRMFkIuDc_hWaBFc";
// const ABSTRACT_API_KEY = "1d389e652459454083cd4ba089cc12da";

const {geohashForLocation} = require("geofire-common");


// firebase deploy --only functions:Location-getLocationByIP
exports.getLocationByIP = functions.https.onCall((data) => {
  try {
    if (data) {
      const userId = data.userId;
      const gps = data.gps;
      const hash = geohashForLocation([gps.lat, gps.lng]);

      functions.logger.log("USER LOG", userId);
      functions.logger.log("GPS LOG", gps);
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

// firebase deploy --only functions:Location-reverseGeocode
exports.reverseGeocode = functions.https.onCall((data) => {
  if (data) {
    if (data.lat && data.lng) {
      return got
          .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${GOOGLE_MAPS_API_KEY}`)
          .json()
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((error) => {
            functions.logger.log("ERROR", error);
            return Promise.resolve(false);
          });
    }
  }
  return Promise.resolve(false);
});
