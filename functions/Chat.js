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
          // functions.logger.log(chat.participants, chat.seen);
          const unseenParticipants = chat.participants.filter((x) => !chat.seen.includes(x));
          // functions.logger.log("unseenParticipants", unseenParticipants);

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
            // GET ANY PREVIOUS NOTIFICATIONS AND UPDATED IT
            const goTo = `/chats/chat/${chat.id}`;
            // console.log(`CHAT > Users/${userId}/Notifications`);
            // console.log(`CHAT > goTo > ${goTo}`);
            db.collection(`Users/${userId}/Notifications`)
                .where("goTo", "==", goTo)
                .orderBy("created_at", "desc")
                .limit(1)
                .get()
                .then((snapshot) => {
                  // console.log("CHAT > snapshot", snapshot);
                  functions.logger.log("CHAT > snapshot", snapshot);
                  if (snapshot.empty) {
                    // ADD DOCUMENT
                    // console.log("CHAT > ADD NEW");
                    functions.logger.log("CHAT > ADD NEW");
                    db.collection(`Users/${userId}/Notifications`).add({
                      uid: userId,
                      title: notificationTitle,
                      body: chat.lastMessage,
                      goTo: goTo,
                      type: "chat",
                    }).then(() => {
                      return Promise.resolve(true);
                    }).catch(() => {
                      return Promise.resolve(false);
                    });
                  } else {
                    // UPDATE DOCUMENT
                    // console.log("CHAT > UPDATE EXISTING");
                    // functions.logger.log("CHAT > UPDATE EXISTING");
                    db.doc(`Users/${userId}/Notifications/${snapshot.docs[0].id}`).update({
                      body: chat.lastMessage,
                      created_at: new Date(),
                    });
                  }
                }).catch((e) => {
                  // CATCH
                  console.log("CHAT > CATCH > ", e);
                  functions.logger.log("CHAT > CATCH > ", e);
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
