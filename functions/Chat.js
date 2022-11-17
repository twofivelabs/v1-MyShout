const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");

const moment = require("moment");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "my-shout-app.appspot.com",
  });
}

const db = admin.firestore();
const bucket = admin.storage().bucket("gs://my-shout-app.appspot.com");


// firebase deploy --only functions:Chat
// firebase deploy --only functions:Chat-ChatMessageCreated
exports.ChatMessageCreated = functions.firestore
    .document("Chats/{ChatId}/Messages/{MessageId}")
    .onCreate((messageDoc, context) => {
      const {
        params: {
          ChatId,
        },
      } = context;
      const message = messageDoc.data();

      if (message) {
        return db.doc(`Chats/${ChatId}`).get().then((doc) => {
          const chat = doc.data();
          functions.logger.log(chat.participants, chat.seen);
          const unseenParticipants = chat.participants.filter((x) => !chat.seen.includes(x));
          functions.logger.log("unseenParticipants", unseenParticipants);

          // Update user docs that they have un-seen messages
          unseenParticipants.forEach((userId) => {
            // Update notification bubble
            db.doc(`Users/${userId}`).update({
              "notifications.hasMessages": true,
            }).then(() => {
              return Promise.resolve(true);
            }).catch(() => {
              return Promise.resolve(false);
            });
            // Send notification
            let notificationTitle = `Notification from ${chat.title}`;
            if (!chat.title) {
              notificationTitle = "Chat Notification";
            }
            db.collection(`Users/${userId}/Notifications`).add({
              uid: userId,
              title: notificationTitle,
              body: chat.lastMessage,
              goTo: `/chats/chat/${chat.id}`,
              type: "chat",
            }).then(() => {
              return Promise.resolve(true);
            }).catch(() => {
              return Promise.resolve(false);
            });
          });
        });
      }
    });

// firebase deploy --only functions:Chat-scheduledFunctionExpireAudioMessages
exports.scheduledFunctionExpireAudioMessages = functions.pubsub.schedule("59 11 * * *")
    .timeZone("America/New_York")
    .onRun((context) => {
      return db.collectionGroup("Messages").orderBy("audioUrl").where("audioUrl", "!=", "").orderBy("created_at").get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const days = Math.round(moment.duration(moment().startOf("day") - doc.data().created_at.toDate()).asDays());
          if (days >= 30) {
            const url = decodeURIComponent(doc.data().audioUrl.split("/")[7].split("?")[0]);
            bucket.file(url).delete().then((res)=>{
              const chatId = doc.ref.parent.parent.id;
              return db.collection("Chats").doc(chatId).collection("Messages").doc(doc.id).update({"audioUrl": "", "audioExpired": true});
            });
          }
        });
      });
    });
