const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const stripeTestSecret = "sk_test_51JPFp9KFsRJwypJ7SxXafJ2qvWFuR26wuH73lOU8hkfZ5GJDxjvNT8EbvZwbQX5GfwtznyC5t4bmEGuJ9YPek0pQ00FG0afN7j";
const endpointSecret = "whsec_Fpvt4jIcxKTaE2Nqz0oiq1G1l9KuyVBg";
const stripe = require("stripe")(stripeTestSecret);

// firebase deploy --only functions:StripeWebhooks-getSecret
exports.getSecret = functions.https.onCall((which) => {
  switch (which) {
    case "stripe_secret":
      return stripeTestSecret;
  }
});

// firebase deploy --only functions:StripeWebhooks-stripeCreatePaymentIntent
exports.stripeCreatePaymentIntent = functions.https.onCall((obj) => {
  if (obj) {
    return stripe.paymentIntents.create(obj)
        .then(() => {
          return Promise.resolve(true);
        }).catch(() => {
          return Promise.resolve(false);
        });
  }
  return false;
});

// WEBHOOK ENDPOINT = https://us-central1-pint-app-dev.cloudfunctions.net/stripeEvents
// firebase deploy --only functions:StripeWebhooks-stripeEvents
exports.stripeEvents = functions.https.onRequest((request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;
  functions.logger.log(request);

  // Verify the request against our endpointSecret
  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    functions.logger.log("STRIPE EVENT", event);
  } catch (error) {
    functions.logger.log("Stripe Webhook Error, ", error);
    return response.status(400).end();
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    return handleSuccessfulPaymentIntent(paymentIntent).then(() => {
      return response.status(200).end();
    });
  }
  functions.logger.log("stripeEvents onRequest END");
  response.send("Endpoint for Stripe Webhooks!");
});

/**
 * handleSuccessfulPaymentIntent
 * Handle sending money to companies
 * https://stripe.com/docs/connect/charges-transfers
 * @param {Object} paymentIntent
 */
function handleSuccessfulPaymentIntent(paymentIntent) {
  const transferGroup = paymentIntent.transfer_group;
  const userId = paymentIntent.metadata.user_id;
  const chargeId = paymentIntent.charges.data[0].id;
  const orderId = transferGroup;

  if (!orderId) {
    functions.logger.log("handleSuccessfulPaymentIntent > No Order Id");
    return;
  }

  functions.logger.log("orderId === ", orderId);
  admin.firestore().doc(`Carts/${userId}/Orders/${orderId}`).set({
    stripeTransfer: false,
    paymentIntent: paymentIntent,
    charge_id: chargeId,
    order: {
      status: "paid",
    },
  }, {merge: true})
      .then(() => {
        return Promise.resolve(true);
      }).catch(() => {
        return Promise.resolve(false);
      });
}

exports.sendStripeTransfers = functions.https.onCall((obj) => {
  if (obj.userId && obj.orderId) {
    return sendStripeTransfers(obj.userId, obj.orderId)
        .then(() => {
          return Promise.resolve(true);
        }).catch(() => {
          return Promise.resolve(false);
        });
  }
});

/**
 * sendStripeTransfers
 * @param {userId} userId
 * @param {orderId} orderId
 */
function sendStripeTransfers(userId, orderId) {
  let docData;

  const orderDoc = admin.firestore().doc(`Carts/${userId}/Orders/${orderId}`);

  // Get order
  orderDoc.get()
      .then((doc) => {
        if (doc.exists) {
          docData = doc.data();
        }
      });

  if (docData) {
    // Loop through the groups and send transfer payment
    functions.logger.log("docData", docData);
    for (const itemKey in docData.order.grouped.items) {
      if (docData.order.grouped.items[itemKey]) {
        // Get company
        admin.firestore().doc(`Companies/${itemKey}`).get().then((company) => {
          // We need the stripe account id to transfer funds
          const stripeAccountId = company.data().stripe_account_id;
          const totals = docData.order.grouped.totals[itemKey];

          functions.logger.log(`Does company ${itemKey}, have stripe_account_id? ${stripeAccountId}`);

          // Create a Transfer to the connected account:
          if (stripeAccountId) {
            stripe.transfers.create({
              amount: totals.total,
              currency: "cad",
              source_transaction: docData.charge_id,
              destination: stripeAccountId,
              // transfer_group: transfer_group
            }).then((transfer) => {
              orderDoc.set({
                transfer: transfer,
                stripeTransfer: true,
              }, {merge: true})
                  .then(() => {
                    return Promise.resolve(true);
                  });
            }).catch(() => {
              return Promise.resolve(false);
            });
          }
        }).catch(() => {
          return Promise.resolve(false);
        });
      }
    }
  }
}

/**
 * Create Stripe Customer
 * https://stripe.com/docs/api/customers/create
 * @return {Promise<void>}
 * @param {Object} params
 */
function createCustomer(params) {
  return stripe.customers.create(params)
      .then((response) => {
        if (response.id) {
          return Promise.resolve(response.id);
        }
        return Promise.resolve(false);
      }).catch((err) => {
        functions.logger.log("Error creating Stripe customer", err);
        return Promise.resolve(false);
      });
}

// firebase deploy --only functions:StripeWebhooks-createCustomer
exports.createCustomer = functions.https.onCall((params) => {
  functions.logger.log("Creating customer for", params);
  return createCustomer(params).then(() => {
    return Promise.resolve(true);
  }).catch(() => {
    return Promise.resolve(false);
  });
});
// Must have the API version to create this key
// firebase deploy --only functions:StripeWebhooks-createCustomer
exports.createCustomerEphemeralKeys = functions.https.onCall((customerId) => {
  functions.logger.log("Creating ephemeralKeys for", customerId);
  return stripe.ephemeralKeys.create({customer: customerId}, {apiVersion: "2020-08-27"})
      .then(() => {
        return Promise.resolve(true);
      }).catch(() => {
        return Promise.resolve(false);
      });
});
