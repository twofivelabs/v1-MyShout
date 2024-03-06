const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production==="true" ? require("./service-production.json") : require("./service-development.json");
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
    console.log('STICKY: HTTP DATA:', data)
  try {
    console.log("STICKY: UpdateGPS");
    if (data) {
      const userId = data.userId;
      console.log('STICKY: UserId:', userId)
      let gps = data.gps;
      // Adjustments to the HTTP POST method from the phone plugin
      if (data?.coords) {
          gps = {
              lat: data.coords.latitude,
              lng: data.coords.longitude
          }
      }
      if (data?.location?.coords) {
          gps = {
              lat: data.location.coords.latitude,
              lng: data.location.coords.longitude
          }
      }

      console.log("STICKY: UserId:", userId, gps);
      if (!userId || !gps) return;

      const hash = geohashForLocation([gps.lat, gps.lng]);
      console.log("STICKY: Hash:", hash);

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
            functions.logger.log("STICKY: Error updating GPS data", e);
            return Promise.resolve(false);
          });
    }
    return Promise.resolve(false);
  } catch (e) {
    functions.logger.log("STICKY: Error updating GPS data 2", e);
    return Promise.resolve(false);
  }
});

// firebase deploy --only functions:Rest-updateGPSRequest
exports.updateGPSRequest = functions.https.onRequest((req, res) => {

    let userId
    let gps

    if(req.method !== "POST"){
        return res.status(400).send('Request Type Not Allowed');
    }

    // Get the body data
    let bodyJson = req.body;
    console.log('STICKY: HTTP DATA:', bodyJson);

    if (bodyJson) {
        // Some data is formatted differently
        if (bodyJson.data) {
            bodyJson = bodyJson.data;
        }

        // Set user
        userId = bodyJson.userId;
        console.log('STICKY: UserId:', userId);

        // try and find GPS data
        let bodyGps = bodyJson?.gps;
        if (bodyJson?.coords) {
            bodyGps = bodyJson.coords
        }
        if (bodyJson?.location?.coords) {
            bodyGps = bodyJson.location.coords
        }

        gps = {
            lat: bodyGps.lat || bodyGps.latitude,
            lng: bodyGps.lng || bodyGps.longitude
        }
    }

    if(!userId || !gps){
        return res.status(400).send('User or GPS is empty');
    }

    const hash = geohashForLocation([gps.lat, gps.lng]);
    console.log("STICKY: UserId:", userId, gps);

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
            return res.status(200).send('Success');
        }).catch(() => {
            return res.status(400).send('Error updating GPS data');
        });
});
