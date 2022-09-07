const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
// const OrdersCollection = admin.firestore().collection("Orders")
const UsersCollection = admin.firestore().collection("Users");
const CompaniesCollection = admin.firestore().collection("Companies");
const CommunicationCollection = admin.firestore().collection("Communication");

// firebase deploy --only functions:Orders
// firebase deploy --only functions:Orders-UserOrderWrite
exports.UserOrderWrite = functions.firestore
    .document("Carts/{UserId}/Orders/{OrderId}")
    .onUpdate((order, context) => {
      const {
        params: {
          OrderId,
          UserId,
        },
      } = context;
      // const data = order.data() // only for CREATE
      const data = order.after.data(); // Only for UPDATE
      const dataBefore = order.before.data(); // Only for UPDATE
      functions.logger.log(data, OrderId);

      if (data) {
        let user;

        // Get User Data
        UsersCollection.doc(UserId).get().then((snapshot) => {
          user = snapshot.data();

          const userOrder = {
            type: "email",
            category: "user",
            to_email: user.email,
            subject: "Thank you for your order, Pint",
            h1: "Your Order",
            message: "Thank you for your order!",
            templateId: "z86org8xyk4ew137",
            data: data,
            custom: templateUserOrder(data),
          };
          // shopping, received, ready_to_ship, ready_for_pickup, in_transit, completed
          if (data.order.status === "ready_to_ship") {
            userOrder.subject = "Your order is ready to be shipped!";
            userOrder.h1 = "Your order is ready to be shipped!";
            userOrder.message = "Your order is ready to be shipped!";
          }
          if (data.order.status === "ready_for_pickup") {
            userOrder.subject = "Your order is ready for pickup!";
            userOrder.h1 = "Your order is ready for pickup!";
            userOrder.message = "Your order is ready for pickup!";
          }
          if (data.order.status === "in_transit") {
            userOrder.subject = "Your order is on it's way!";
            userOrder.h1 = "Your order is on it's way!";
            userOrder.message = "Your order is on it's way!";
          }
          if (data.order.status === "completed") {
            userOrder.subject = "We hope you enjoy!";
            userOrder.h1 = "We hope you enjoy!";
            userOrder.message = "We hope you enjoy!";
          }

          // CUSTOMER NOTIFICATION
          if (user.email) {
            if (data.order.status !== dataBefore.order.status) {
              CommunicationCollection.add(userOrder).then(() => {
                return Promise.resolve(true);
              }).catch(() => {
                return Promise.resolve(true);
              });
            }
          }

          // COMPANY NOTIFICATION
          if (data.order.items && (data.order.status === "received")) {
            const grouped = data.order.grouped;
            for (const groupKey in grouped.items) {
              if (grouped.items[groupKey]) {
                let company;
                if (data.order.status !== dataBefore.order.status) {
                  CompaniesCollection.doc(groupKey).get().then((snapshot) => {
                    company = snapshot.data();
                  });

                  if (company) {
                    const companyOrder = {
                      created_at: data.created_at,
                      orderId: data.orderId,
                      bill_to: data.order.bill_to,
                      ship_to: data.order.ship_to,
                      shipping_instructions: data.order.shipping_instructions,
                      items: grouped.items[groupKey],
                      shipping_selected: grouped.shipping[groupKey],
                      taxes: grouped.taxes[groupKey],
                      totals: grouped.totals[groupKey],
                    };
                    if (company.orderNotifications) {
                      company.orderNotifications.forEach((notification) => {
                        if (notification.type === "email") {
                          companyOrder.type = "email";
                          companyOrder.category = "company";
                          companyOrder.to_email = notification.to;
                          companyOrder.subject = "New Order From Pint";
                          companyOrder.h1 = "New Order";
                          companyOrder.message = "You have a new order.";
                          companyOrder.templateId = "z86org8xyk4ew137";
                          companyOrder.custom = templateCompanyOrder(companyOrder);
                          // This will send a notification
                          CommunicationCollection.add(companyOrder).then(() => {
                            return Promise.resolve(true);
                          });
                          functions.logger.log("send company notification, EMAIL");
                        }
                        if (notification.type === "sms") {
                          functions.logger.log("send company notification, SMS");
                        }
                      });
                    }
                  }
                }
              }
            }
          } else {
            functions.logger.log("No Order Data");
          }
        }).catch(() => {
          return Promise.resolve(false);
        });
      }
    });

/**
 * templateCompanyOrder
 * Create order template for a company notification
 * @param {Object} order
 * @return {String}
 */
function templateCompanyOrder(order) {
  let html = "";

  const personal = `<table style="width:100%; border-spacing:0;">
    <tr>
      <td>
        <div><b>Bill To</b></div>
        <div>${order.bill_to.address_2 || ""} ${order.bill_to.address_1}</div>
        <div>${order.bill_to.city} ${order.bill_to.province}</div>
        <div>${order.bill_to.country} ${order.bill_to.postal}</div>
      </td>
      <td>
        <div><b>Ship To</b></div>
        <div>${order.ship_to.address_2 || ""} ${order.ship_to.address_1}</div>
        <div>${order.ship_to.city} ${order.ship_to.province}</div>
        <div>${order.ship_to.country} ${order.ship_to.postal}</div>
      </td>
    </tr>
  </table>
  <hr style="margin-top:20px; margin-bottom:20px;">`;
  html += personal;

  let items = "<table style=\"width:100%; border-spacing:0;\">";
  order.items.forEach((o) => {
    items += `<tr>
        <td><b>${o.name}</b></td>
        <td style="text-align:right;">${o.quantity}</td>
        <td style="text-align:right;">${centsToDollars(o.total)}</td>
      </tr>`;
  });
  items += `<tfoot>
      <tr>
        <td style="border-top:1px solid #ccc; text-align:right;"></td>
        <td style="border-top:1px solid #ccc; text-align:right;">Sub Total</td>
        <td style="border-top:1px solid #ccc; text-align:right;">${centsToDollars(order.totals.sub_total)}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Bottle Deposit</td>
        <td style="text-align:right;">${centsToDollars(order.totals.bottle_deposit) || ""}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Shipping</td>
        <td style="text-align:right;">${centsToDollars(order.totals.shiping) || "0.00"}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Tax</td>
        <td style="text-align:right;">${centsToDollars(order.totals.tax)}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Total</td>
        <td style="text-align:right;">${centsToDollars(order.totals.total)}</td>
      </tr>
    </tfoot>`;
  items += "</table>";
  html += items;

  const message = `<div style="padding-top:10px; padding-bottom:10px;">Shipping Instructions: ${order.shipping_instructions || "N/A"}</div>`;
  html += message;

  const shipping = `<div style="padding-top:10px; padding-bottom:10px;">Shipping Selected: ${order.shipping_selected.label}</div>`;
  html += shipping;

  return html;
}

/**
 * templateUserOrder
 * Create order template for a user notification
 * @param {Object} order
 * @return {String}
 */
function templateUserOrder(order) {
  let html = "";
  const o = order.order;

  const personal = `<table style="width:100%; border-spacing:0;">
    <tr>
      <td>
        <div><b>Bill To</b></div>
        <div>${o.bill_to.address_2 || ""} ${o.bill_to.address_1}</div>
        <div>${o.bill_to.city} ${o.bill_to.province}</div>
        <div>${o.bill_to.country} ${o.bill_to.postal}</div>
      </td>
      <td>
        <div><b>Ship To</b></div>
        <div>${o.ship_to.address_2 || ""} ${o.ship_to.address_1}</div>
        <div>${o.ship_to.city} ${o.ship_to.province}</div>
        <div>${o.ship_to.country} ${o.ship_to.postal}</div>
      </td>
    </tr>
  </table>
  <hr style="margin-top:20px; margin-bottom:20px;">`;
  html += personal;

  let items = "<table style=\"width:100%; border-spacing:0;\">";
  o.items.forEach((i) => {
    items += `<tr>
        <td><b>${i.name}</b> <small>${i.company.name}</small></td>
        <td style="text-align:right;">${i.quantity}</td>
        <td style="text-align:right;">${centsToDollars(i.total)}</td>
      </tr>`;
  });
  items += `<tfoot>
      <tr>
        <td style="border-top:1px solid #ccc; text-align:right;"></td>
        <td style="border-top:1px solid #ccc; text-align:right;">Sub Total</td>
        <td style="border-top:1px solid #ccc; text-align:right;">${centsToDollars(o.sub_total)}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Bottle Deposit</td>
        <td style="text-align:right;">${centsToDollars(o.bottle_deposit_total) || 0}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Shipping</td>
        <td style="text-align:right;">${centsToDollars(o.shipping_total) || 0}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Tax</td>
        <td style="text-align:right;">${centsToDollars(o.taxes)}</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align:right;">Total</td>
        <td style="text-align:right;">${centsToDollars(o.total_after_tip)}</td>
      </tr>
    </tfoot>`;
  items += "</table>";
  html += items;

  const message = `<div style="padding-top:10px; padding-bottom:10px;">Shipping Instructions: ${o.shipping_instructions || "N/A"}</div>`;
  html += message;

  return html;
}

/**
 * centsToDollars
 * Convert cents to dollars
 * @param {int} amount
 * @return {String}
 */
function centsToDollars(amount) {
  if (amount) {
    const dollars = amount / 100;
    return dollars.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  return "0.00";
}
