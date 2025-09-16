"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
import { ImagesSlider } from "@/components/ui/images-slider";
import { useRouter } from "next/navigation";

export default function About() {
  const images = ["/umaidpalace.png", "/umaidpalace.png", "/umaidpalace.png"];

  const router = useRouter();

  const bookDestination = (destination) => {
    router.push(`/booking?destination=${destination}`);
  };
  return (
    <section id="about" className="relative h-[60vh] md:h-[80vh] ">
      <ImagesSlider images={images} className="">
        {/* Hero Section */}
        {/* <div className="absolute inset-0">
        <img
          src="/umaidpalace.png"
          alt="Umaid Bhawan Palace"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 "></div>
      </div> */}

        <div className="flex items-center justify-center h-full z-50">
          <div className="text-center text-white px-4">
            <h1
              className="text-xl sm:text-3xl md:text-5xl font-bold mb-4 text-balance"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Step into royalty at the Umaid Bhawan Palace, a stunning blend of
              Indian and European styles,
            </h1>
            <p
              className="text-lg mb-8 text-balance"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              still home to the royal family of Jodhpur.
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-offset="0"
              className="pointer-events-auto"
            >
              <Button
                onClick={() => bookDestination("Umaid Bhawan")}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-md transform hover:scale-105 transition-transform duration-300"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </ImagesSlider>
    </section>
  );
}
