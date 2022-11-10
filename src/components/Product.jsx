import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

let MAX_STARS = 5;
let MIN_STARS = 1;

const Product = ({ id, title, price, description, category, image }) => {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_STARS - MIN_STARS + 1) + MIN_STARS)
  );

  const [isPrime] = useState(Math.random() < 0.5);

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      isPrime,
    };
    //  With the dispatch below we are sending the product object to the redux store
    dispatch(addToCart(product));
  };

  return (
    <div className="relative flex flex-col m-5 rounded-md bg-white z-30 p-10">
      <p className="absolute top-3 right-5 text-sm italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        className="mb-4 mx-auto object-contain"
        height={200}
        width={200}
        alt={description}
      />
      <h4>{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <StarIcon className="h-5 text-yellow-500" key={index} />
          ))}
      </div>
      <p className="text-sm my-2 line-clamp-3">{description}</p>
      <div className="mb-4">
        <Currency quantity={price} currency="USD" />
      </div>
      {isPrime && (
        <div className="flex items-center space-x-2 -mt-2 mb-5">
          <Image
            src="/amazon-prime-logo.png"
            width={80}
            height={25}
            alt="Amazon Prime Icon"
          />
          <p className="text-xs text-gray-500">Free Next-Day Delivery</p>
        </div>
      )}
      <button onClick={addItemToCart} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
