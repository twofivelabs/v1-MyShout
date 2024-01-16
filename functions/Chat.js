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

// firebase deploy --only functions:Chat
// firebase deploy --only functions:Chat-ChatMessageCreated
exports.ChatMessageCreated = functions.firestore
    .document("Chats/{ChatId}/Messages/{MessageId}")
    .onCreate((messageDoc, context) => {
      // Extract ChatId from the context provided by the Firestore trigger
      const {
        params: {
          ChatId,
        },
      } = context;

      // Get the data of the created message
      const message = messageDoc.data();

      // End function if the message does not exist
      if (!message) return;

      // Retrieve the corresponding chat document using ChatId
      return db.doc(`Chats/${ChatId}`).get().then((doc) => {
        const chat = doc.data();

        // Filter out participants who haven't seen the message and are not muted
        const unseenParticipants = chat.participants
            .filter((participant) => !chat.seen.includes(participant) && !chat.muted.includes(participant));

          // Loop through each applicable participant to notifiy of new chat message
          unseenParticipants.forEach((userId) => {
            // Update each user's document to indicate they have unread messages
            db.doc(`Users/${userId}`).update({
              "has.messages": true
            }).then(() => {
              return Promise.resolve(true);
            }).catch((e) => {
              console.log("CANNOT UPDATE unseenParticipants ", e);
              return Promise.resolve(false);
            });

            // Prepare notification details
            let notificationTitle = `Notification from ${chat.title}`;
            if (!chat.title) {
              notificationTitle = "Chat Notification";
            }
            // GET ANY PREVIOUS NOTIFICATIONS AND UPDATED IT
            const goTo = `/chats/chat/${chat.id}`;

            // Check for any existing notifications for the same chat and update them
            db.collection(`Users/${userId}/Notifications`)
                .where("goTo", "==", goTo)
                .orderBy("created_at", "desc")
                .limit(1)
                .get()
                .then((snapshot) => {
                  // Add a new notification for the user
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

                  // Delete any previous notifications for the same chat
                  if (!snapshot.empty) {
                    db.doc(`Users/${userId}/Notifications/${snapshot.docs[0].id}`).delete().catch((e) => {
                      console.log("Error deleting notification", e);
                    });
                  }
                }).catch((e) => {
                  functions.logger.log("CHAT > NEW MESSAGE > CATCH > ", e);
                });
          });
      });
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
