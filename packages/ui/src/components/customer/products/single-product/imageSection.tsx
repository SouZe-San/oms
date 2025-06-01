"use client";

import { useState, useEffect } from "react";

import replaceImage from "../../../../assets/icons/logo/oms.svg";

import Image from "next/image";

import "./style.css";

const ImageSection = ({
  images,
}: {
  images: {
    id: string;
    productId: string;
    url: string;
  }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imagesPerSlide = isLargeScreen ? 2 : 1;
  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + imagesPerSlide >= images.length ? 0 : prevIndex + imagesPerSlide));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - imagesPerSlide < 0 ? images.length - imagesPerSlide : prevIndex - imagesPerSlide
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex * imagesPerSlide);
  };

  return (
    <div className="relative md:max-w-7xl sm:max-w-lg max-w-xs max-sm:max-h- mx-auto px-4 py-8 img-section">
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${(currentIndex / imagesPerSlide) * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index.toString()} className={`flex-none w-full ${isLargeScreen ? "lg:w-1/2" : ""} p-2`}>
              <Image
                src={image.url || replaceImage}
                width={200}
                height={100}
                alt={`Slide ${index + 1}`}
                className="w-full h-[400px] sm:object-cover object-contain rounded-lg "
                loading="lazy"
                blurDataURL={image.url || replaceImage}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute -left-[5%] top-1/2 -translate-y-1/2  hover:bg-white/50  p-3 rounded-lg shadow-lg transition-all duration-200 left-btn disabled:cursor-not-allowed disabled:hover:bg-white/10"
        aria-label="Previous slide "
        disabled={currentIndex === 0 && images.length <= imagesPerSlide}
      >
        <svg width="20" height="42" viewBox="0 0 20 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.21531 21.1572L19.2823 37.1038C19.7608 37.6462 19.9923 38.279 19.977 39.0022C19.9617 39.7253 19.7142 40.3581 19.2344 40.9005C18.7547 41.4429 18.1965 41.7141 17.5598 41.7141C16.9231 41.7141 16.3649 41.4429 15.8852 40.9005L1.14833 24.2489C0.76555 23.815 0.478469 23.3268 0.287081 22.7844C0.0956938 22.242 0 21.6996 0 21.1572C0 20.6148 0.0956938 20.0724 0.287081 19.53C0.478469 18.9876 0.76555 18.4995 1.14833 18.0655L15.8852 1.35966C16.3636 0.817261 16.9301 0.55474 17.5847 0.572096C18.2392 0.589453 18.8051 0.870054 19.2823 1.4139C19.7595 1.95774 19.9987 2.59054 20 3.3123C20.0013 4.03405 19.762 4.66685 19.2823 5.21069L5.21531 21.1572Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-[5%] top-1/2 -translate-y-1/2  hover:bg-white/50   p-3 rounded-lg shadow-lg transition-all duration-200 right-btn disabled:cursor-not-allowed disabled:hover:bg-white/10"
        aria-label="Next slide"
        disabled={currentIndex + imagesPerSlide >= images.length && images.length <= imagesPerSlide}
      >
        <svg width="20" height="42" viewBox="0 0 20 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.7847 21.1572L0.717707 37.1038C0.239238 37.6462 0.00766051 38.279 0.0229715 39.0022C0.0382825 39.7253 0.28581 40.3581 0.765554 40.9005C1.2453 41.4429 1.80351 41.7141 2.4402 41.7141C3.07688 41.7141 3.63509 41.4429 4.11484 40.9005L18.8517 24.2489C19.2345 23.815 19.5215 23.3268 19.7129 22.7844C19.9043 22.242 20 21.6996 20 21.1572C20 20.6148 19.9043 20.0724 19.7129 19.53C19.5215 18.9876 19.2345 18.4995 18.8517 18.0655L4.11484 1.35966C3.63637 0.817261 3.06986 0.55474 2.41532 0.572096C1.76077 0.589453 1.1949 0.870054 0.717707 1.4139C0.240514 1.95774 0.00128041 2.59054 4.49022e-06 3.3123C-0.00127143 4.03405 0.237962 4.66685 0.717707 5.21069L14.7847 21.1572Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Dot Navigation */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              Math.floor(currentIndex / imagesPerSlide) === index ? "bg-pink-600 w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
