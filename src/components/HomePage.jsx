import React from "react";
import {
  Car,
  Bus,
  MapPin,
  Users,
  Star,
  Clock,
  Shield,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Banner from "@/components/section/Banner";
import Services from "@/components/section/Services";
import WhyChooseUs from "@/components/section/WhyChooseUs";
import Destination from "@/components/section/Destination";
import Fleet from "@/components/section/Fleet";
import Offer from "@/components/section/Offer";
import ContactForm from "@/components/section/ContactForm";

export default function HomePage() {
  return (
    <div className="min-h-screen">
    

      <Banner />

      {/* Destinations */}
      <Destination />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Fleet */}
      <Fleet />

      {/* Offers */}
      <Offer />

      {/* Services Section */}
      <Services />
      {/* Contact Form */}
      {/* <ContactForm /> */}

     
    </div>
  );
}
