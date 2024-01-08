const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production ? require("./service-production.json") : require("./service-development.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const UsersCollection = admin.firestore().collection("Users");

const Twilio = require("twilio");
const twilioAccount = require("./twil_api.json");
const twilioClient = new Twilio(twilioAccount.accountSid, twilioAccount.authToken);

// firebase deploy --only functions:TwilioSMS-UserSMSWrite
exports.UserSMSWrite = functions.firestore
    .document("Users/{UserId}/SMS/{SMSId}")
    .onCreate((sms, context) => {
      const {
        params: {
          SMSId,
          UserId,
        },
      } = context;
      const data = sms.data();
      functions.logger.log("STICKY1", data);

      if (data) {
        let phone;

        // Get User Data
        UsersCollection.doc(UserId).get().then((snapshot) => {
          phone = snapshot.data().phone;
          functions.logger.log("STICKY2", snapshot.data());

          if (phone) {
            twilioClient.messages.create({
              body: data.body,
              from: twilioAccount.phoneNumber,
              to: phone,
            }).then((r) => {
              const path = `Users/${UserId}/SMS/${SMSId}`;
              functions.logger.log("STICKY PATH: ", path);
              functions.logger.log("STICKY Save SMS Response", r);

              admin.firestore().doc(path).update({response: {
                to: r.to,
                from: r.from,
                errorMessage: r.errorMessage,
                errorCode: r.errorCode,
                sid: r.sid,
                accountSid: r.accountSid,
              }}).catch((e) => {
                functions.logger.log("STICKY ADD RESPONSE", e);
              });
            }).catch((e) => {
              functions.logger.log("STICKY3", e);
            });
          } else {
            functions.logger.log("No phone to send sms alert");
            return Promise.resolve(false);
          }
        });

        return Promise.resolve(true);
      } else {
        functions.logger.log("No data to send sms alert");
        return Promise.resolve(false);
      }
    });

// firebase deploy --only functions:Twilio-sendSMS
exports.sendSMS = functions.https.onCall((data) => {
  try {
    if (data) {
      if (data.phone) {
        twilioClient.messages.create({
          body: data.body,
          from: twilioAccount.phoneNumber,
          to: data.phone,
        }).then((response) => {
          functions.logger.log(response);
        });
        return Promise.resolve(true);
      } else {
        functions.logger.log("No phone to send sms alert");
        return Promise.resolve(false);
      }
    }
    return Promise.resolve(false);
  } catch (e) {
    console.log(e);
    return Promise.resolve(false);
  }
});

// firebase deploy --only functions:Twilio-getPhoneNumber
exports.getPhoneNumber = functions.https.onCall((data) => {
  try {
    if (data) {
      if (data.phone) {
        return twilioClient.lookups.v1
            .phoneNumbers(data.phone)
            .fetch()
            .then((response) => {
              return Promise.resolve(response);
            }).catch(() => {
              return Promise.resolve(false);
            });
      } else {
        functions.logger.log("No phone to send sms alert");
        return Promise.resolve(false);
      }
    }
    return Promise.resolve(false);
  } catch (e) {
    console.log(e);
    return Promise.resolve(false);
  }
});
