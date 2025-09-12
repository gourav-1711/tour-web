"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

export default function Destination() {
  const destinations = [
    {
      name: "Jaipur",
      image: "/jal-mahal-jaipur-rajasthan-1-attr-hero.png",
    },
    {
      name: "Bikaner",
      image: "/bikaner.png",
    },
    {
      name: "Jaisalmer",
      image: "/jaisalmer.png",
    },
    {
      name: "Surat",
      image: "/surat.png",
    },
    {
      name: "Osian",
      image: "/osian.png",
    },
    {
      name: "Pushkar",
      image: "/pushkar.png",
    },
    {
      name: "Indore",
      image: "/indore.png",
    },
    {
      name: "Kumbhalgarh",
      image: "/kumbhalgarh.png",
    },
    {
      name: "Ahmedabad",
      image: "/ahmedabad.png",
    },
  ];
  const router = useRouter();

  const bookDestination = (destination) => {
    router.push(`/booking?destination=${destination}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center mb-4">
            Popular Destinations From{" "}
            <span className="text-red-500">Jodhpur</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations just a ride away from Jodhpur
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
              data-aos-once="true"
            >
              <Card className="overflow-hidden group cursor-pointer py-0 h-full transform hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-full flex flex-col">
                  <div className="flex-grow overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white text-xl font-semibold drop-shadow-lg">
                        {destination.name}
                      </h3>
                      <Button
                        // asChild
                        onClick={() => bookDestination(destination.name)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 transform transition-all duration-300 group-hover:scale-110"
                        size="sm"
                      >
                        Book Now <Send />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


