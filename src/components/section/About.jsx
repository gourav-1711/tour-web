import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-purple-600 to-blue-600">
      {/* Hero Section */}
      <div className="absolute inset-0">
        <img
          src="/umaidpalace.png"
          alt="Umaid Bhawan Palace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-balance"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Step into royalty at the Umaid Bhawan Palace, a stunning blend of
            Indian and European styles,
          </h1>
          <p
            className="text-xl mb-8 text-balance"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            still home to the royal family of Jodhpur.
          </p>
          <div data-aos="fade-up" data-aos-delay="600" data-aos-offset="0">
            <Button
              asChild
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg transform hover:scale-105 transition-transform duration-300"
            >
              <a href="/booking">Book Now</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300"
        data-aos="fade-right"
        data-aos-delay="800"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300"
        data-aos="fade-left"
        data-aos-delay="800"
      >
        <ChevronRight size={40} />
      </button>
    </section>
  );
}
