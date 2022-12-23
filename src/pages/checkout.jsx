import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Currency from 'react-currency-formatter';
import CheckoutProduct from '../components/CheckoutProduct';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session.js',
      {
        items: items,
        email: session.user.email,
      });
      //Function to redirect the user to checkout route
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/Prime-day-banner.png"
            className="object-contain"
            width={1020}
            height={250}
            alt="Prime day banner"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? 'Your Shoping Cart is empty'
                : 'Shopping Cart'}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                isPrime={item.isPrime}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{' '}
                <span className="font-bold">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>

              <button
                role="link"
                disabled={!session}
                onClick={createCheckoutSession}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
