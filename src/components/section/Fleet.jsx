import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Fleet() {
  return (
    <div>
      {/* Our Fleet */}
      <section className="py-16 bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-red-500">Fleet</span>
          </h2>

          <div className="flex flex-wrap justify-center space-y-6 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Sedan",
                subtitle: "City Rides",
                features: [
                  "Fit 4 Pax",
                  "Night local extra",
                  "Day trip Extra",
                  "Border tax extra",
                ],
                price: "For Local ₹2500/-",
                image: "/sedan.png",
              },
              {
                name: "Ertiga",
                subtitle: "Fit 6 Pax",
                features: [
                  "300 running for",
                  "Night local extra",
                  "Day trip Extra",
                  "Border tax extra",
                ],
                price: "For Local ₹3500/-",
                image: "/ertiga.png",
              },
              {
                name: "Innova",
                subtitle: "Fit 6 Pax",
                features: [
                  "300 running for",
                  "Night local extra",
                  "Day trip Extra",
                  "Border tax extra",
                ],
                price: "For Local ₹3500/-",
                image: "/innova.png",
              },
              {
                name: "Innova Crysta",
                subtitle: "Fit 6 Pax",
                features: [
                  "300 running for",
                  "Night local extra",
                  "Day trip Extra",
                  "Border tax extra",
                ],
                price: "For Local ₹4000/-",
                image: "/innovacrysta.png",
              },
              {
                name: "Tempo Traveller",
                subtitle: "Fit 12 Pax",
                features: [
                  "300 running for",
                  "Night local extra",
                  "Day trip Extra",
                  "Border tax extra",
                ],
                price: "",
                image: "/tempo.png",
                isLarge: true,
              },
            ].map((vehicle, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={(index % 2) * 50}
                className="relative w-[98%] p-3 sm:p-0 sm:w-[85%] md:w-[70%] lg:w-[47%]"
                key={index}
              >
                {/* Background box */}
                <div className="rounded-[13px] absolute top-1/10 -translate-y-1/10 left-1/2 -translate-x-1/2 bg-red-500 max-w-[100%] w-[339px] h-[260px] sm:h-[234px] z-0 p-2"></div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl font-bold mb-2 sm:mb-4 text-center text-background">
                  {vehicle.name}
                </h3>

                {/* Content */}
                <div className="flex gap-0 sm:gap-2 relative z-10 ">
                  <div className="flex items-center">
                    <Image
                      width={200}
                      height={200}
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      className="h-32 sm:h-36 w-auto drop-shadow-lg -ml-11 [@media(min-width:550px)]:-ml-0 sm:-mr-0 "
                    />
                  </div>
                  <div className="text-background">
                    {/* Features */}
                    <ul className="text-sm space-y-1 mb-2 sm:mb-4 font-medium text-shadow-sm -ml-9 [@media(min-width:550px)]:-ml-0">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    {/* Price */}
                    {vehicle.price && (
                      <p className="font-semibold text-sm mb-2 sm:mb-4 -ml-9 [@media(min-width:550px)]:-ml-0">
                        {vehicle.price}
                      </p>
                    )}
                    {/* Book Button */}
                    <Button className="w-full bg-white text-red-500 font-semibold hover:bg-gray-100">
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

//  <Card
//                 key={index}
//                 className="relative bg-red-500 text-white shadow-lg overflow-visible max-w-sm mx-auto rounded-lg w-[95%] sm:w-[45%]"
//               >
//                 <CardContent className="p-6 text-center">
//                   {/* Vehicle Name */}
//                   <h3 className="text-2xl font-bold mb-4">{vehicle.name}</h3>

//                   {/* Vehicle Image (outside left) */}
//                   <div className="absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2">
//                     <img
//                       src={vehicle.image || "/placeholder.svg"}
//                       alt={vehicle.name}
//                       className="h-28 md:h-36 w-auto drop-shadow-lg"
//                     />
//                   </div>

//                   {/* Features */}
//                   <ul className="text-sm space-y-1 mb-4 ">
//                     {vehicle.features.map((feature, idx) => (
//                       <li key={idx} className="ml-5  text-right md:text-center">
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>

//                   {/* Price */}
//                   {vehicle.price && (
//                     <p className="font-semibold text-sm mb-4 ml-5">
//                       {vehicle.price}
//                     </p>
//                   )}

//                   {/* Book Button */}
//                   <Button className="w-full bg-white text-red-500 font-semibold hover:bg-gray-100">
//                     Book
//                   </Button>
//                 </CardContent>
//               </Card>
