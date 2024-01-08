const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = functions.config().env.production ? require("./service-production.json") : require("./service-development.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

exports.MailerLite = require("./MailerLite");
exports.MailerSend = require("./MailerSend");
exports.Location = require("./Location");
exports.Notifications = require("./Notifications");
exports.TwilioSMS = require("./Twilio");
exports.Users = require("./Users");
exports.AlertButtons = require("./AlertButtons");
exports.Chat = require("./Chat");
exports.Rest = require("./Rest");

// trigger function on new user creation.
// firebase deploy --only functions:AddUserRole
exports.AddUserRole = functions.auth.user().onCreate((authUser) => {
  console.log("Creating New User", authUser);
  if (authUser.email || authUser.phoneNumber) {
    const customClaims = {
      // admin: true,
      // subscriber: true,
      customer: true,
      isActive: true,
    };
    return admin.auth()
        .setCustomUserClaims(authUser.uid, customClaims)
        .then(() => {
          db.collection("Users").doc(authUser.uid).set({
            phone: authUser.phoneNumber,
            email: authUser.email,
            role: customClaims,
            initial: null,
            first_name: null,
            last_name: null,
            username: null,
            badges: [],
            location: {
              address_1: null,
              address_2: null,
              city: null,
              country: null,
              postal: null,
              province: null,
            },
            permissions: {
              notifications: true,
              location: true,
              shareLocationWithFriends: true,
            },
            has: {
              notifications: false,
              messages: false,
            },
            notifications: {
              hasNotifications: false,
              hasMessages: false,
            },
            gps: {
              lat: null,
              lng: null,
            },
            photoURL: null,
            notificationWebToken: null,
            notificationDeviceToken: null,
            isOnline: {
              status: "offline",
            },
            stripeCustomerId: null,
            securityPin: null,
          }).then(() => {
            return Promise.resolve(true);
          }).catch(() => {
            return Promise.resolve(false);
          });
        }).catch(() => {
          return Promise.resolve(false);
        });
  }
});
