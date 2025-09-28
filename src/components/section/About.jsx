"use client";
import React from "react";
import { MapPin, ShieldCheck, Star } from "lucide-react";
import "aos/dist/aos.css";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ImageChange from "../ui/ImageChange";

export default function About() {
  const router = useRouter();
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About{" "}
            <span className="text-red-600 hover:text-red-700 transition-colors duration-300">
              Gurukripa Tours
            </span>
          </h2>
          <div
            className="w-20 h-1 bg-red-600 mx-auto transform hover:scale-110 transition-transform duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          ></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div
            className="lg:w-1/2 group"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
              <ImageChange />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Your Journey, Our Priority
                </h3>
                <p className="text-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  Experience India like never before
                </p>
              </div>
            </div>
          </div>

          <div
            className="lg:w-1/2 space-y-6"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <p
              className="text-gray-600 text-lg leading-relaxed hover:text-gray-800 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              Welcome to{" "}
              <span className="font-semibold text-red-600 hover:text-red-700 transition-colors duration-300">
                Gurukripa Tours and Travels
              </span>
              , your trusted travel partner for exploring India with ease and
              comfort. We specialize in providing premium cab and travel
              services across the country, connecting you to every major city,
              tourist attraction, and hidden gem.
            </p>

            <div className="space-y-4">
              <div
                className="group/item flex items-start gap-4 p-4 rounded-lg hover:bg-red-50 transition-all duration-300 hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600 group-hover/item:bg-red-200 group-hover/item:scale-110 transition-all duration-300">
                  <MapPin className="w-5 h-5 group-hover/item:scale-125 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover/item:text-red-700 transition-colors duration-300">
                    Nationwide Coverage
                  </h4>
                  <p className="text-gray-600 group-hover/item:text-gray-800 transition-colors duration-300">
                    Extensive network across India's top destinations
                  </p>
                </div>
              </div>

              <div
                className="group/item flex items-start gap-4 p-4 rounded-lg hover:bg-red-50 transition-all duration-300 hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay="450"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600 group-hover/item:bg-red-200 group-hover/item:scale-110 transition-all duration-300">
                  <ShieldCheck className="w-5 h-5 group-hover/item:scale-125 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover/item:text-red-700 transition-colors duration-300">
                    Safe & Reliable
                  </h4>
                  <p className="text-gray-600 group-hover/item:text-gray-800 transition-colors duration-300">
                    Well-maintained vehicles with trained chauffeurs
                  </p>
                </div>
              </div>

              <div
                className="group/item flex items-start gap-4 p-4 rounded-lg hover:bg-red-50 transition-all duration-300 hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600 group-hover/item:bg-red-200 group-hover/item:scale-110 transition-all duration-300">
                  <Star className="w-5 h-5 group-hover/item:scale-125 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover/item:text-red-700 transition-colors duration-300">
                    24/7 Support
                  </h4>
                  <p className="text-gray-600 group-hover/item:text-gray-800 transition-colors duration-300">
                    Round-the-clock assistance for your travel needs
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => router.push("/#services")}
              className="mt-6 px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-200 hover:shadow-xl "
              data-aos="fade-up"
              data-aos-delay="550"
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
