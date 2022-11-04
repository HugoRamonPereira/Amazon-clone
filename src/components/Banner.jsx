import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-white to-transparent bottom-0 z-20 " />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image
            loading="lazy"
            width={150}
            height={60}
            src="/amazon-carousel1.jpg"
            alt="carousel1"
          />
        </div>
        <div>
          <Image
            loading="lazy"
            width={150}
            height={60}
            src="/amazon-carousel2.jpg"
            alt="carosuel2"
          />
        </div>
        <div>
          <Image
            loading="lazy"
            width={150}
            height={60}
            src="/amazon-carousel3.jpg"
            alt="carousel3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
