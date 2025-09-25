import { Check } from "lucide-react";
import React from "react";

export default function WhyChooseUs() {
  return (
    <>
      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2
            data-aos="fade-up"
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Why Choose us
          </h2>

          <div className="max-w-6xl mx-auto space-y-4">
            {[
              "24/7 Customer Support",
              "All-India Permit Cabs",
              "Well-Trained & Verified Drivers",
              "Clean, Sanitized & GPS-enabled Vehicles",
              "Flexible Pricing & Transparent Billing",
              "Custom Itinerary Planning",
              "On-Time Guarantee",
            ].map((feature, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
                key={index}
                className="flex items-center space-x-3"
              >
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
