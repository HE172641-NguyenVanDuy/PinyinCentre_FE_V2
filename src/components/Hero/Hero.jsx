import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Image1 = "https://firebasestorage.googleapis.com/v0/b/interviewmangement-7da65.appspot.com/o/banner%2F1.jpg?alt=media&token=2d1d97d2-5c9a-4230-8b8b-8934c0ea0411";
const Image2 = "https://firebasestorage.googleapis.com/v0/b/interviewmangement-7da65.appspot.com/o/banner%2F2.jpg?alt=media&token=bedfe05d-afde-47ba-8b1b-8c10c0b92734";
const Image3 = "https://firebasestorage.googleapis.com/v0/b/interviewmangement-7da65.appspot.com/o/banner%2F3.jpg?alt=media&token=fffcd170-0164-4b5b-ae02-97fbb1660e41";

const ImageList = [Image1, Image2, Image3];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ImageList.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle next and previous buttons
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ImageList.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ImageList.length - 1 : prevIndex - 1
    );
  };
  const handleScrollToSubscribe = () => {
    const element = document.getElementById("subscribe");
    if (element) {
      const offset = 160;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden w-screen left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-950">
      {/* Background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-[8] lg:h-[900px] lg:w-[900px]"></div>

      {/* Image rotation container with aspect ratio */}
      <div className="relative w-screen left-1/2 transform -translate-x-1/2 pt-[50%]">
        <div className="absolute top-0 left-0 w-screen h-full">
          {ImageList.map((img, index) => (
            <img
              onClick={handleScrollToSubscribe}
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute top-0 left-0 w-screen h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              } object-cover object-center`}
            />
          ))}
        </div>
      </div>

      {/* Left and Right navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-black p-1 sm:p-3 rounded-full shadow-lg hover:bg-gray-300 transition-all text-sm sm:text-xl"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-black p-1 sm:p-3 rounded-full shadow-lg hover:bg-gray-300 transition-all text-sm sm:text-xl"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Hero;