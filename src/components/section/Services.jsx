import React from "react";
import { Card } from "@/components/ui/card";
import { XCircle, IndianRupee, PhoneCall, Car } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Zero Cancellation",
      description:
        "Enjoy zero cancellation charges, if booking is cancelled 6 hours prior to departure time.",
      color: "bg-blue-200 hover:bg-blue-300",
      iconBg: "bg-red-500 group-hover:bg-red-600",
      icon: <XCircle className="w-8 h-8 text-white" />,
      animation: "fade-up",
    },
    {
      title: "Price Transparency",
      description: "No HIDDEN Charges.",
      color: "bg-green-200 hover:bg-green-300",
      iconBg: "bg-red-500 group-hover:bg-red-600",
      icon: <IndianRupee className="w-8 h-8 text-white" />,
      animation: "fade-up",
      delay: 100,
    },
    {
      title: "24x7 Service",
      description: "Our customer care is available 24x7",
      color: "bg-yellow-200 hover:bg-yellow-300",
      iconBg: "bg-blue-600 group-hover:bg-blue-700",
      icon: <PhoneCall className="w-8 h-8 text-white" />,
      animation: "fade-up",
      delay: 200,
    },
    {
      title: "Two Way",
      description:
        "Why pay for round trip, when you can hire a cab for Two way trip.",
      color: "bg-lime-200 hover:bg-lime-300",
      iconBg: "bg-yellow-500 group-hover:bg-yellow-600",
      icon: <Car className="w-8 h-8 text-white" />,
      animation: "fade-up",
      delay: 300,
    },
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="text-red-500">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the best in class services tailored for your comfort
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group ${service.color} rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
              data-aos={service.animation}
              data-aos-delay={service.delay || 0}
              data-aos-once="true"
            >
              {/* Icon Circle */}
              <div
                className={`w-20 h-20 ${service.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md transition-all duration-300 group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
