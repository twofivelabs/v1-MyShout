const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production==="true" ? require("./service-production.json") : require("./service-development.json");

const cors = require('cors')({origin: true});

const moment = require("moment");
const axios = require('axios');
const cheerio = require('cheerio');

const SimpleCrypto = require("simple-crypto-js").default

// Don't change this, or else everything will be un-readable
const secretKey = "47d4n7wV5j6pO#^^ww*bTcc0B"
const simpleCrypto = new SimpleCrypto(secretKey)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "my-shout-app.appspot.com",
  });
}

const db = admin.firestore();
const bucket = admin.storage().bucket("gs://my-shout-app.appspot.com");

// firebase deploy --only functions:Chat
// firebase deploy --only functions:Chat-ChatMessageOnCreate
exports.ChatMessageOnCreate = functions.firestore
  .document("Chats/{ChatId}/Messages/{MessageId}")
  .onCreate(async (snapshot, context) => {
    const { ChatId } = context.params;
    const data = snapshot.data();

    // Retrieve chat document reference
    const chatRef = db.doc(`Chats/${ChatId}`);
    // Retrieve chat document snapshot
    const chatSnapshot = await chatRef.get();
    // Extract chat data
    const chat = chatSnapshot.data();
    // Return if chat document does not exist
    if (!chat) return null;

    // Filter participants who have not seen the message
    const participantsToUpdate = chat.participants.filter(participant => !data.seen.includes(participant));
    // Initialize batched write
    let batch = db.batch();

    // Update notification counts for each participant and send push notifications
    participantsToUpdate.forEach(async userId => {
      try {
        // Retrieve user document reference
        const userRef = db.doc(`Users/${userId}`);
        // Increment "notifications.messages" count
        batch.update(userRef, {
          "notifications.message": admin.firestore.FieldValue.increment(1)
        });
        // Construct unseen count key
        const unseenCountKey = `unseen.${userId}`;
        // Increment unseen count for chat document
        batch.update(chatRef, {
          [unseenCountKey]: admin.firestore.FieldValue.increment(1)
        });

        // Retrieve user document snapshot
        const userSnap = await userRef.get();
        // Extract user data
        const userData = userSnap.data();

        // Send push notification if user allows notifications and has a device token
        if (userData.permissions.notifications !== false && userData.notificationDeviceToken) {
          // Fetch sender's profile to get the username
          const senderProfileSnapshot = await db.doc(`Users/${data.owner}`).get();
          const senderProfileData = senderProfileSnapshot.data();
          const senderUsername = senderProfileData?.username || 'You received a new message';

          const intermMessage = simpleCrypto.decrypt(data.message);
          const messageBody = intermMessage.substring(0, 75); // Limit message body to 75 characters

          const messagePayload = {
            token: userData.notificationDeviceToken,
            notification: {
              title: senderUsername,
              body: messageBody,
            },
            data: {
              chatId: ChatId,
              messageId: snapshot.id,
            },
          };
          await admin.messaging().send(messagePayload);
        }
      } catch (error) {
        console.error("Error sending push notification:", error);
      }
    });

    // Commit batched writes
    await batch.commit();
    return null;
  });

// firebase deploy --only functions:Chat
// firebase deploy --only functions:Chat-ChatOnWrite
exports.ChatOnWrite = functions.firestore
  .document("Chats/{ChatId}")
  .onWrite(async (change, context) => {
    const { ChatId } = context.params;

    const before = change.before.exists ? change.before.data() : null;
    const after = change.after.exists ? change.after.data() : null;

    if (!before && after) return;

    try {
      // Handle case where a participant is removed from the chat
      console.log("Before Participants", before.participants.length)
      console.log("After Participants", after.participants.length)

      if ((before && after) && (before.participants.length > after.participants.length)) {
        console.log("Trigger")
        // Identify users who have been removed from the chat
        const removedUsers = before.participants.filter(userId => !after.participants.includes(userId));
        console.log("RemovedUsers", removedUsers)

        // Decrement "notifications.message" count for each removed user
        await Promise.all(removedUsers.map(async userId => {
          console.log("Removing User From Chat", userId)
          const unseenCount = before.unseen[userId];
          console.log("User's unseen messges in chat", before.unseen[userId])

          const userRef = db.doc(`Users/${userId}`);
          const userSnap = await userRef.get();
          const userData = userSnap.data()

          // Decrement "notifications.message" count by the number of unseen messages
          await userRef.update({
            "notifications.message": admin.firestore.FieldValue.increment(
              userData.notifications.message >= unseenCount ? -unseenCount : 0
            )
          });
          console.log("Message Notification Count Updated")
        }));

        return null;
      }

      // Return null if no action is required
      return null;
    } catch (error) {
      console.error("Error in ChatMessageOnWrite function:", error);
      // Handle the error appropriately, such as logging or returning a response
      return null;
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

// firebase deploy --only functions:Chat-ChatViewMessage
exports.ChatViewMessage = functions
  .runWith({ memory: "512MB" })
  .https.onCall(async (body, context) => {
    if (!context.auth) return; 

    try {
      console.log(`User ${context.auth.uid} Has Viewed Message ${body.messageId} in Chat ${body.chatId}`);

      const chatRef = db.collection("Chats").doc(body.chatId)
      const messageRef = chatRef.collection("Messages").doc(body.messageId)

      //Add User to Seen array in message document
      await messageRef.update({
        seen: admin.firestore.FieldValue.arrayUnion(context.auth.uid)
      })

      //Get total count of unseen messages in chat
      const allMessagesSnapshot = await chatRef.collection("Messages").get();
      const allMessagesCount = allMessagesSnapshot.size;
      console.log(`All Messages`, allMessagesCount)

      const allSeenMessagesSnapshot = await chatRef.collection("Messages").where('seen', 'array-contains', context.auth.uid).get();
      const allSeenMessagesCount = allSeenMessagesSnapshot.size;
      console.log(`All Unseen Messages`, allSeenMessagesCount)

      const unseenCount = allMessagesCount - allSeenMessagesCount;
      console.log("Unseen", unseenCount || 'error counting');

      //Update chat document with how many messages the user hasn't seen
      await chatRef.update({
        unseen: {
          [context.auth.uid]: unseenCount || 0
        }
      })

      return true;
    } catch (e) {
      console.log("Error: ChatViewMessage", e)
      return false
    }
  })     

// https://us-central1-my-shout-staging.cloudfunctions.net/Chat-fetchUrlMetadata
// firebase deploy --only functions:Chat-fetchUrlMetadata
exports.fetchUrlMetadata = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    const { url } = request.query;

    if (!url) return response.status(400).send('URL is required');

    try {
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);

      const title = $('title').text().trim();
      const image = $('meta[property="og:image"]').attr('content');
      const description = $('meta[name="description"]').attr('content');

      return response.status(200).json({
        title,
        image,
        description
      });

    } catch (error) {
      console.error('Error fetching URL metadata:', error);

      if (error.response) {
        response.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        response.status(503).send('Request failed. Check network');
      } else {
        response.status(500).send('Something went wrong');
      }
    }
  });
});
