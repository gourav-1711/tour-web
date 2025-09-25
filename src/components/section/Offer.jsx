"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, Car, Check, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Offer() {
  const [isHovered, setIsHovered] = useState(false);

  const { offer, isAvalible, loading } = useSelector(
    (state) => state.offerDetails
  );

  if (!offer || Object.keys(offer).length === 0) {
    return (
      <section id="offer" className="text-center py-8 sr-only">
        No offer found
      </section>
    );
  }

  if (loading) {
    return (
      <section id="offer" className="text-center py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 sm:text-4xl mb-3">
              Special Travel Offer
            </h2>
            <p className="mt-2 text-xl text-blue-700 dark:text-blue-300 font-medium">
              Limited time exclusive package for your dream vacation
            </p>
          </div>
          <div className="flex justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="offer"
      className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 sm:text-4xl mb-3">
            Special Travel Offer
          </h2>
          <p className="mt-2 text-xl text-blue-700 dark:text-blue-300 font-medium">
            Limited time exclusive package for your dream vacation
          </p>
        </div>

        <Card
          className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 relative h-80 md:h-auto group overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <div className="absolute bottom-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {offer.title}
                  </h3>
                  <div className="flex items-center text-green-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{offer.location}</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 z-0"></div>
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className={`object-cover transition-all duration-700 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-lg z-20">
                {offer.discount}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 md:w-1/2 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <div className="flex items-center mt-2 text-blue-600 dark:text-blue-300">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{offer.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                    ₹ {offer.price}
                  </span>
                  <p className="text-sm text-gray-500 line-through">
                    ₹ {offer.oldPrice}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group">
                  <Clock className="h-5 w-5 mr-2 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                  <span>Duration: {offer.duration}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group">
                  <Calendar className="h-5 w-5 mr-2 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                  <span>Available: {offer.dateRange}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 group">
                  <Car className="h-5 w-5 mr-2 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                  <span>Vehicle: {offer.vehicle}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-4 h-1 bg-red-500 mr-2 rounded-full"></span>
                  Tour Features:
                </h4>
                <ul className="space-y-3">
                  {offer.features.map((feature, index) => (
                    <li key={index} className="flex items-center group/feature">
                      <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full mr-3 group-hover/feature:bg-green-100 dark:group-hover/feature:bg-green-900/30 transition-colors duration-300">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400 group-hover/feature:text-green-600 dark:group-hover/feature:text-green-400 transition-colors duration-300" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 group-hover/feature:text-gray-900 dark:group-hover/feature:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <a href={`tel:${process.env.NEXT_PUBLIC_MOBILE_NUMBER}`}>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-6 text-lg font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900/50">
                    Book Now
                  </Button>
                </a>
              </div>

              <p className="mt-4 text-sm text-blue-600 dark:text-blue-300 text-center font-medium">
                Limited spots available. Book now to secure your adventure!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
