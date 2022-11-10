import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/cartSlice";

const Checkout = () => {
  const items = useSelector(selectItems);

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
                ? "Your Shoping Cart is empty"
                : "Shopping Cart"}
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
      </main>
    </div>
  );
};

export default Checkout;
