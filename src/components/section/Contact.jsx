"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { ContactForm } from "./ContactForm";

export default function Contact() {
  return (
    <div className="relative overflow-hidden py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground  mb-4 font-headline">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need support? Fill out the form, and our team will
            get back to you shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8  backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div
            className="p-8 md:p-12 text-foreground"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

            <div className="space-y-6">
              <div
                className="flex items-start gap-4 group hover:scale-105 transition-transform duration-300"
                data-aos="fade-right"
                data-aos-delay="150"
              >
                <div className="bg-white/20 p-3 rounded-xl transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-slate-700">+91 98765 43210</p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 group hover:scale-105 transition-transform duration-300"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="bg-white/20 p-3 rounded-xl transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-slate-700">support@example.com</p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 group hover:scale-105 transition-transform duration-300"
                data-aos="fade-right"
                data-aos-delay="250"
              >
                <div className="bg-white/20 p-3 rounded-xl transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Our Office</h3>
                  <p className="text-slate-700">123 Jodhpur, Rajasthan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="" data-aos="fade-left" data-aos-delay="100">
            <div className="flex items-center gap-2 mb-6">
              <Send className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Send us a message
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
