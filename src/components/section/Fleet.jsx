"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Fleet() {
  const router = useRouter();

  const bookDestination = (destination, rate) => {
    router.push(`/booking?destination=${destination}&rate=${rate}`);
  };

  const { fleetDetails } = useSelector((state) => state.fleetDetails);

  return (
    <div>
      {/* Our Fleet */}
      <section className="py-16 bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-red-500">Fleet</span>
          </h2>

          <div className="flex flex-wrap justify-center space-y-6 gap-6 max-w-6xl mx-auto">
            {fleetDetails.map((vehicle, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={(index % 2) * 50}
                className="relative w-[98%] p-3 sm:p-0 sm:w-[85%] md:w-[70%] lg:w-[47%] group"
                key={index}
              >
                {/* Background box */}
                <div className="rounded-[13px] absolute top-1/10 -translate-y-1/10 left-1/2 -translate-x-1/2 bg-red-500 max-w-[100%] w-[339px] h-[260px] sm:h-[239px] z-0 p-2 group-hover:scale-105 transition-all duration-300"></div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl font-bold mb-2 sm:mb-4 text-center text-background">
                  {vehicle.name}
                </h3>

                {/* Content */}
                <div className="flex gap-0 sm:gap-2 relative z-10 group-hover:scale-105 transition-all duration-300">
                  <div className="flex items-center">
                    <Image
                      width={200}
                      height={200}
                      loading="lazy"
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      className="h-32 sm:h-36 w-auto drop-shadow-lg -ml-11 [@media(min-width:550px)]:-ml-0 sm:-mr-0 "
                    />
                  </div>
                  <div className="text-background">
                    {/* Features */}
                    <ul className="text-sm space-y-1 mb-2 sm:mb-2 font-medium text-shadow-sm -ml-9 [@media(min-width:550px)]:-ml-0">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    {/* Price */}
                    {vehicle.price && (
                      <p className="font-semibold text-sm mb-2 sm:mb-2 -ml-9 [@media(min-width:550px)]:-ml-0">
                        {vehicle.price}
                      </p>
                    )}
                    {/* Book Button */}
                    <Button
                      onClick={() => bookDestination("_", vehicle.rate)}
                      className="w-full bg-white text-red-500 font-semibold hover:bg-gray-100"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
