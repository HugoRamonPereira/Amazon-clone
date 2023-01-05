import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// Secure the connection to Firebase from the backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}) : admin.app();

const fulfillOrder = async (session) => {
  // console.log('Order fulfilled', session);

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log(`Success: Order ${session.id} has been added to the Database`);
    });
};

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestedBuffer = await buffer(req);
    const payload = requestedBuffer.toString();
    const signature = req.headers['stripe-signature'];

    let event;

    //Verify that the Event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (error) {
      console.log('Error', error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Fulfill order...
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((error) => res.status(400).send(`Webhook Error: ${error.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};
