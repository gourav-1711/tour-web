"use client";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { Button } from "./button";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
  onBookNow, // New prop to handle book now clicks
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  const [descriptions] = useState([
    {
      name: "Umaid Bhawan",
      title:
        "Step into royalty at the Umaid Bhawan Palace, a stunning blend of Indian and European styles,",
      description: "still home to the royal family of Jodhpur.",
      button: "Book Now",
    },
    {
      name: "Jaisalmer Fort",
      title:
        "Discover the golden beauty of Jaisalmer Fort, a living fort in the heart of the Thar Desert,",
      description: "where ancient architecture meets timeless desert magic.",
      button: "Book Now",
    },
    {
      name: "Mehrangarh Fort",
      title:
        "Experience the mighty Mehrangarh Fort, towering majestically above the blue city,",
      description: "offering breathtaking views and rich Rajasthani heritage.",
      button: "Book Now",
    },
  ]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleBookNow = (destinationName) => {
    if (onBookNow) {
      onBookNow(destinationName);
    } else {
      console.log(`Booking ${destinationName}`);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load images", error));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;
  const currentDescription = descriptions[currentIndex] || descriptions[0];

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center group",
        className
      )}
      style={{
        perspective: "1500px",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/30 z-10", overlayClassName)}
        />
      )}
      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            loading="priority"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-50 flex items-center justify-between p-2 sm:p-4 md:p-6 pointer-events-none">
        <Button
          onClick={handlePrevious}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors duration-300 focus:outline-none cursor-pointer pointer-events-auto"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          onClick={handleNext}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors duration-300 focus:outline-none cursor-pointer pointer-events-auto"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </Button>
      </div>

      {/* Animated Hero Content */}
      <div className="flex items-center justify-center h-full z-40 pointer-events-none">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-2 sm:space-y-4 md:space-y-6"
            >
              {/* Destination Name */}
              <motion.div
                className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-amber-300 tracking-widest uppercase mb-2 sm:mb-3 md:mb-4"
                variants={textVariants}
              >
                {currentDescription.name}
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 md:mb-6 text-balance leading-tight"
                variants={textVariants}
              >
                {currentDescription.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 text-balance max-w-4xl mx-auto opacity-90"
                variants={textVariants}
              >
                {currentDescription.description}
              </motion.p>

              {/* Button */}
              <motion.div
                variants={textVariants}
                className="pointer-events-auto"
              >
                <Button
                  onClick={() => handleBookNow(currentDescription.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg cursor-pointer rounded-lg"
                >
                  {currentDescription.button}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 sm:space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 cursor-pointer",
              index === currentIndex
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};
