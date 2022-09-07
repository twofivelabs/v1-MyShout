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
const ABSTRACT_API_KEY = "1d389e652459454083cd4ba089cc12da";

// firebase deploy --only functions:Location-getLocationByIP
exports.getLocationByIP = functions.https.onCall((IP) => {
  // https://ipapi.co/8.8.8.8/json/
  if (IP) {
    return got
        .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&ip=${IP}`)
        .json()
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((error) => {
          functions.logger.log("ERROR", error);
          return Promise.resolve(false);
        });
  }
  return Promise.resolve(false);
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
  return false;
});
