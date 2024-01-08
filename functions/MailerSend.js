const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = functions.config().env.production==="true" ? require("./service-production.json") : require("./service-development.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

// This is from MailerSend.com, uses Justin's login to get the key
const mailerSend = new MailerSend({
  // eslint-disable-next-line max-len
  api_key: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmE2ZGIyNGE2OWZkNmY4M2U3YzZlZTA3YmE1YThjN2QzNDVlZTNkNDRlNjE5YmMwMzY3YzU3ZDhhZWExZTk5MWZjYzA5MmNlMzdjNzM5ODMiLCJpYXQiOjE2NjE4MTY5MDYuNTI2ODY3LCJuYmYiOjE2NjE4MTY5MDYuNTI2ODcxLCJleHAiOjQ4MTc0OTA1MDYuNTIyOTE4LCJzdWIiOiIzNjYwNyIsInNjb3BlcyI6WyJlbWFpbF9mdWxsIiwiZG9tYWluc19mdWxsIiwiYWN0aXZpdHlfZnVsbCIsImFuYWx5dGljc19mdWxsIiwidG9rZW5zX2Z1bGwiLCJ3ZWJob29rc19mdWxsIiwidGVtcGxhdGVzX2Z1bGwiLCJzdXBwcmVzc2lvbnNfZnVsbCIsInNtc19mdWxsIiwiZW1haWxfdmVyaWZpY2F0aW9uX2Z1bGwiXX0.n7cZlnH37dtt_NKDXK0KFMVrfEBjNU_SRkO1dxtk3wRFUFwPOpnBAz9CIVwtTNh-z10c7jxEcZ3z6Tdz-lgrnUKMJ-DvM0cL4IHfBnzcr7P4zD6MKYZL8nTL0WfuBIuicxictWSZTOvGNYhie7icSZCrAwWK7ANGpDuAiEpilykKW_atzQPMn2jvVuJjYbd_oZMwBpNUQrYzwnmoj7ZMsuUpd3qTj3uksHU1M7ihvDanPMA77OYQhwxE5AhKVv2tN-TsRS3szAx3FjNxVNdQTjSAVV4BA-6qs3WdmJXPTbWhUSQ2W07HHViOQDxWwGJkGkdD-s4h8IWobLFNV_Apz7e21ci5L18Jn3moKYtVeC4d7K2rb2SIO-6Qbyv_DbyfBtUyoTr7Fm5aRHXFRoQ18g4Vnh_y85KyEugr3wGn9B8IW9BwwiQ92fqlXor2WkUnPKp5N0phaw3gNaFtCTD4kjc4VoXb_F1sBYry-BCarJNfVLrYwfeq6F0n3Lol1qD7dO4h4QxrfhifDcPk3jnR74mhFMJSVbw-qsROC27mzNUsQNM72gLqSWv3nbt_YAsiZJSYW2vwqBj17Jh3wQwY0msNH3HeFrTTyGSzwQGnakTjKZDvgtUmQqsFsmjqi7wuRb7L-x8icpbhA4ScPq-cdYpCm9lWIfee37DyJesqAAo",
});

const _FROM_EMAIL = "noreply@myshout.net";
const _FROM_NAME = "MyShout";

// eslint-disable-next-line require-jsdoc
function sendEmail(data) {
  const recipients = [
    new Recipient(data.to_email, data.to_name),
  ];

  const variables = [
    {
      email: data.to_email,
      substitutions: [
        {
          var: "header",
          value: data.h1,
        },
        {
          var: "text",
          value: data.message,
        },
        {
          var: "custom",
          value: data.custom || "",
        },
      ],
    },
  ];

  const emailParams = new EmailParams()
      .setFrom(_FROM_EMAIL)
      .setFromName(_FROM_NAME)
      .setRecipients(recipients)
      .setSubject(data.subject)
      .setTemplateId(data.templateId || "jpzkmgq7e3yl059v") // General
      .setVariables(variables);

  return mailerSend.send(emailParams);
}

// firebase deploy --only functions:MailerSend-send
// This will send MailerSend
exports.send = functions.https.onCall((data) => {
  if (data) {
    return sendEmail(data);
  }
  return false;
});

// firebase deploy --only functions:MessageWrite
exports.MessageWrite = functions.firestore
    .document("Messages/{MessageId}")
    .onCreate((message, context) => {
      const {params: {MessageId}} = context;
      const data = message.data();
      functions.logger.log(data, MessageId);

      if (data) {
        sendEmail(data).then((sendResponse) => {
          const setData = {
            response: {
              status: sendResponse.status,
              message: sendResponse.statusText,
              date: new Date(),
            },
          };
          return db.collection("Messages")
              .doc(MessageId)
              .update(setData)
              .then(() => {
                return Promise.resolve(true);
              }).catch((error) => {
                functions.logger.log("UPDATE DOC ERROR", error);
                return Promise.resolve(false);
              });
        }).catch(() => {
          return Promise.resolve(false);
        });
      }
    });

exports.CommunicationWrite = functions.firestore
    .document("Communication/{CommId}")
    .onCreate((communication, context) => {
      const {params: {CommId}} = context;
      const data = communication.data();
      functions.logger.log(data, CommId);

      if (data) {
        let setData;
        if (data.type === "email") {
          sendEmail(data).then((sendResponse) => {
            setData = {
              response: {
                status: sendResponse.status,
                message: sendResponse.statusText,
                updated_at: new Date(),
              },
            };
            db.collection("Communication")
                .doc(CommId)
                .update(setData)
                .then(() => {
                  return Promise.resolve(true);
                }).catch((error) => {
                  functions.logger.log("UPDATE DOC ERROR", error);
                  return Promise.resolve(false);
                });
          }).catch(() => {
            return Promise.resolve(false);
          });
        }
      }
    });
