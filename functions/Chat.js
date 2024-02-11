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
// firebase deploy --only functions:Chat-ChatMessageOnWrite
exports.ChatMessageOnWrite = functions.firestore
  .document("Chats/{ChatId}/Messages/{MessageId}")
  .onWrite((change, context) => {
      const before = change.before.exists ? change.before.data() : null;
      const after = change.after.exists ? change.after.data() : null;
      const { ChatId } = context.params; // Extracting ChatId from context

      if (!before && after) { // Handling new message creation
            return db.doc(`Chats/${ChatId}`).get().then((doc) => {
                const chat = doc.data();
                if (!chat) return null;

                const participantsToUpdate = chat.participants.filter(participant => !after.seen.includes(participant));

                let batch = db.batch();

                participantsToUpdate.forEach(userId => {
                    const userRef = db.doc(`Users/${userId}`);
                    batch.update(userRef, {
                        "notifications.unseen": admin.firestore.FieldValue.increment(1)
                    });
                });

                return batch.commit().then(() => {
                    console.log(`Unseen count incremented for new message in chat ${ChatId}`);
                }).catch(error => {
                    console.error("Error updating unseen counts:", error);
                });
            });
      }

      if (before && after && JSON.stringify(before.seen) !== JSON.stringify(after.seen)) { // Handling 'seen' array update
            const newSeenUsers = after.seen.filter(userId => !before.seen.includes(userId));

            newSeenUsers.forEach(userId => {
                db.doc(`Users/${userId}`).update({
                    "notifications.unseen": admin.firestore.FieldValue.increment(-1)
                }).catch(error => console.error("Error updating unseen count for user:", userId, error));
            });

            return null;
      }

      return null;
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
