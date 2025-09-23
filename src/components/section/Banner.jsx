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
    <section id="banner" className="relative h-[45vh] md:h-[80vh] group">
      <ImagesSlider
        images={images}
        onBookNow={(destinationName) => {
          bookDestination(destinationName);
        }}
        className=""
      ></ImagesSlider>
    </section>
  );
}
