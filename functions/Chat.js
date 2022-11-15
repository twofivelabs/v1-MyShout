const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {getStorage, ref} = require("firebase-admin/storage");
const serviceAccount = require("./service-key.json");

const moment = require("moment");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const storage = getStorage();


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
      console.log("Checking For Active Audio Clips Due For Expiration");

      return db.collectionGroup("Messages").orderBy("audioUrl").where("audioUrl", "!=", "").orderBy("created_at").get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const days = Math.round(moment.duration(moment().startOf("day") - doc.data().created_at.toDate()).asDays());
          if (days >= 30) {
            console.log("Message Doc: " + doc.id);
            const storageRef = ref(storage, "gs://my-shout-app.appspot.com/CHATS/aR7oFfq1MxjIxTctwMtb/1667409268401.jpg");
            console.log("storageRef", storageRef);
            return db.collectionGroup("Messages").doc(doc.id).collection("Logs").add(storageRef);
            // db.collectionGroup("Messages").doc(doc.id).update({"audioExpired": true});
          }
        });
      });
    });
