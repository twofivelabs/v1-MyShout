const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const MailerLite = require("mailerlite-api-v2-node").default;
// eslint-disable-next-line new-cap
const mailerLite = MailerLite("77aa3fc8fcdd7706f5ed9dbdb4153102");

// firebase deploy --only functions:MailerLite-subscribeUser
// This will add/update user in mailerlite using the EMAIL field
exports.subscribeUser = functions.https.onCall((user) => {
  return mailerLite.addSubscriber({
    name: user.name,
    email: user.email,
    fields: user.fields,
  }).then((res) => {
    functions.logger.log("subscribeUser > RES", res);
    return Promise.resolve(true);
  }).catch((err) => {
    functions.logger.log("subscribeUser > ERROR", err);
    return Promise.resolve(false);
  });
});

