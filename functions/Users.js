const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production ? require("./service-production.json") : require("./service-development.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// firebase deploy --only functions:Users
// firebase deploy --only functions:Users-UserUpdate
exports.UserUpdate = functions.firestore
    .document("Users/{UserId}")
    .onUpdate((user, context) => {
      const {
        params: {
          UserId,
        },
      } = context;
      const data = user.after.data();

      if (data) {
        // If User isActive Is Changed From True To False
        if (user.before.data().role.isActive !== data.role.isActive) {
          console.log("Status For UID " + UserId + " is " + data.role.isActive);

          // Update Firebase Auth if user is disabled
          admin.auth().updateUser(UserId, {disabled: !data.role.isActive}).catch(() => {
            console.log("Error updating user");
          });
          // Update user claims
          admin.auth().setCustomUserClaims(UserId, data.role);
        }

        // If User Is Set To Be Deleted
        if (data.role.deleteMe && data.role.deleteMe===true) {
          console.log("Deleting Account For UID " + UserId);

          // If user is marked for account deletion
          admin.auth().deleteUser(UserId).then(() => {
            db.collection("Users").doc(UserId).delete();
          }).catch(() => {
            console.log("Error deleting user authentication");
          });
        }

        return Promise.resolve(true);
      }
    });

// firebase deploy --only functions:Users-UserDelete
exports.UserDelete = functions.firestore
    .document("Users/{UserId}")
    .onDelete((user, context) => {
      const {
        params: {
          UserId,
        },
      } = context;
      const data = user.data(); // Only for UPDATE

      // TODO: This could be better and deeper deletion
      if (data) {
        try {
          db.collection("Users").doc(UserId).collection("Friends").get().then((snapshot) => {
            console.log(snapshot.size + " Friends");
            for (const f of snapshot.docs) {
              db.collection("Users").doc(f.id).collection("Friends").doc(UserId).delete();
            }
          });

          db.collection("Chats").where("participants", "array-contains", UserId).get().then((snapshot) => {
            console.log(snapshot.size + " chats");
            for (const c of snapshot.docs) {
              db.collection("Chats").doc(c.id).get().then((chat) => {
                if (chat.data().participants && chat.data().participants.length > 2) {
                  db.collection("Chats").doc(c.id).update({"participants": admin.firestore.FieldValue.arrayRemove(UserId)});
                } else {
                  db.collection("Chats").doc(c.id).delete();
                }
              });
            }
          });

          // Delete All Collections From User Document
          db.recursiveDelete(db.collection(`Users/${UserId}/Alerts`));
          db.recursiveDelete(db.collection(`Users/${UserId}/CheckIns`));
          db.recursiveDelete(db.collection(`Users/${UserId}/Friends`));
          db.recursiveDelete(db.collection(`Users/${UserId}/Notifications`));
          db.recursiveDelete(db.collection(`Users/${UserId}/SMS`));

          db.doc(`Users/${UserId}`);

          return Promise.resolve(true);
        } catch (e) {
          functions.logger.log("Error trying to delete user data", e);
        }
      }
    });
