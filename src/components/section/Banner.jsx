"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ImagesSlider } from "@/components/ui/images-slider";
import { useRouter } from "next/navigation";

export default function Banner() {
  const images = ["/umaidpalace.png", "/banner-2.jpeg", "/banner-3.jpeg"];

  const router = useRouter();

  const bookDestination = (destination) => {
    router.push(`/booking?destination=${destination}`);
  };
  return (
    <section id="banner" className="relative h-[60vh] md:h-[80vh] group">
      <ImagesSlider images={images} className="">
    

        <div className="flex items-center justify-center h-full z-50 group-hover:scale-105 transition-transform duration-300">
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
              className=""
            >
              <Button
                onClick={() => bookDestination("Umaid Bhawan")}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-md transform hover:scale-105 transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg"
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
