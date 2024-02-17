const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production==="true" ? require("./service-production.json") : require("./service-development.json");

const cors = require('cors')({origin: true});

const moment = require("moment");
const fetch = require('node-fetch');
const cheerio = require('cheerio');

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
  .onWrite(async (change, context) => {
      const { ChatId } = context.params;
      const before = change.before.exists ? change.before.data() : null;
      const after = change.after.exists ? change.after.data() : null;
      const db = admin.firestore();

      if (!before && after) {
        // Handling new message creation
        const chatDocRef = db.doc(`Chats/${ChatId}`);
        const chatSnapshot = await chatDocRef.get();
        const chat = chatSnapshot.data();
        if (!chat) return null;

        const participantsToUpdate = chat.participants.filter(participant => !after.seen.includes(participant));
        let batch = db.batch();

        participantsToUpdate.forEach(userId => {
            const userRef = db.doc(`Users/${userId}`);
            batch.update(userRef, {
                "notifications.unseen": admin.firestore.FieldValue.increment(1)
            });
            
            const unseenCountKey = `unseenMessages.${userId}`;
            batch.update(chatDocRef, {
                [unseenCountKey]: admin.firestore.FieldValue.increment(1)
            });
        });

        await batch.commit();
        console.log(`Unseen count incremented for new message in chat ${ChatId}`);
        return null;
      }

      if (before && after && JSON.stringify(before.seen) !== JSON.stringify(after.seen)) {
        // Handling 'seen' array update
        const newSeenUsers = after.seen.filter(userId => !before.seen.includes(userId));

        await Promise.all(newSeenUsers.map(async userId => {
            const userRef = db.doc(`Users/${userId}`);
            const userSnap = await userRef.get();
            const userData = userSnap.data();

            if (userData.notifications.unseen > 0) {
                // Ensure unseen count never goes below zero
                await userRef.update({
                    "notifications.unseen": admin.firestore.FieldValue.increment(-1)
                });
            }

            const chatDocRef = db.doc(`Chats/${ChatId}`);
            const unseenCountKey = `unseenMessages.${userId}`;
            const chatSnap = await chatDocRef.get();
            const chatData = chatSnap.data();
            
            if (chatData.unseenMessages && chatData.unseenMessages[userId] > 0) {
                // Ensure unseen message count per chat never goes below zero
                await chatDocRef.update({
                    [unseenCountKey]: admin.firestore.FieldValue.increment(-1)
                });
            }
            
            console.log(`Unseen count decremented for user: ${userId} in chat ${ChatId}`);
        }));

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


// 
// firebase deploy --only functions:Chat-fetchUrlMetadata
exports.fetchUrlMetadata = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { url } = request.query;
    
    if (!url) return response.status(400).send('URL is required');
    
    try {
      const htmlResponse = await fetch(url);
      const html = await htmlResponse.text();
      const $ = cheerio.load(html);
    
      const metadata = {
         title: $('title').first().text(),
         description: $('meta[name="description"]').attr('content'),
        image: $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content'),
      };
    
      response.status(200).json(metadata);
    } catch (error) {
      console.error('Error fetching URL metadata:', error);
      response.status(500).send('Failed to fetch URL metadata');
    }
  });
});