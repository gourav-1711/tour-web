import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ImageChange() {
  const [imageIndex, setImageIndex] = React.useState(0);
  const images = [
    { src: "/about-1.jpeg", alt: "about-1" },
    { src: "/about-2.jpeg", alt: "about-2" },
    { src: "/about-3.jpeg", alt: "about-3" },
    { src: "/about-4.jpeg", alt: "about-4" },
    { src: "/about-5.jpeg", alt: "about-5" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [imageIndex]);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageIndex}
          src={images[imageIndex].src}
          alt={images[imageIndex].alt}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {/* overlay only on hover (desktop) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
    </div>
  );
}
