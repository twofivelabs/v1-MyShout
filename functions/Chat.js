const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production==="true" ? require("./service-production.json") : require("./service-development.json");

const cors = require('cors')({origin: true});
const moment = require("moment");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "my-shout-app.appspot.com",
  });
}

const db = admin.firestore();
const bucket = admin.storage().bucket("gs://my-shout-app.appspot.com");

// firebase deploy --only functions:Chat-getChatRoom
exports.getChatRoom = functions.https.onCall((data, context) => {
  return cors(async (req, res) => {
    // Check if user is authenticated
    if (!context.auth) {
     throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    try {
      const chatId = data.id 
      const chatRef = admin.firestore().collection('Chats').doc(chatId);
      const chatDoc = await chatRef.get();
   
      if (!chatDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Chat not found');
      }
   
      return { chat: chatDoc.data() };
    } catch (error) {
      console.error('Error fetching chat:', error);
      throw new functions.https.HttpsError('unknown', 'An unknown error occurred');
    }
  })
});

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
              "has.messages": true,
              "has.notifications": true,
            }).then(() => {
              return Promise.resolve(true);
            }).catch((e) => {
              console.log("CANNOT UPDATE unseenParticipants ", e);
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

                  // ADD DOCUMENT
                  // console.log("CHAT > ADD NEW");
                  functions.logger.log("CHAT > ADD NEW");
                  db.collection(`Users/${userId}/Notifications`).add({
                    uid: userId,
                    title: notificationTitle,
                    body: chat.lastMessage,
                    goTo: goTo,
                    created_at: new Date(),
                    seen: false,
                    type: "chat",
                  }).then(() => {
                    return Promise.resolve(true);
                  }).catch(() => {
                    return Promise.resolve(false);
                  });

                  if (!snapshot.empty) {
                    // UPDATE DOCUMENT
                    // console.log("CHAT > UPDATE EXISTING");
                    // functions.logger.log("CHAT > UPDATE EXISTING");
                    db.doc(`Users/${userId}/Notifications/${snapshot.docs[0].id}`).delete().catch((e) => {
                      console.log("Error deleting notification", e);
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
