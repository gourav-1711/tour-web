import React from "react";
import {
  Car,
  Bus,
  MapPin,
  Users,
  Plane,
  Building,
  Phone,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Services from "@/components/section/Services";

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Car,
      title: "Car Rental Services",
      description:
        "Premium car rental services with well-maintained vehicles for comfortable and safe journeys across Rajasthan.",
      features: [
        "Wide range of vehicles (Sedan, SUV, Luxury cars)",
        "Well-maintained and sanitized vehicles",
        "Professional and verified drivers",
        "24/7 customer support",
        "Flexible rental options (hourly, daily, weekly)",
      ],
      popular: true,
      startingPrice: "₹15/km",
    },
    {
      icon: Bus,
      title: "Bus Booking Services",
      description:
        "Comfortable and reliable bus booking services for inter-city and intra-city travel across Rajasthan.",
      features: [
        "AC and Non-AC buses available",
        "Multiple boarding points",
        "Online and offline booking",
        "Real-time tracking",
        "Comfortable seating with amenities",
      ],
      popular: false,
      startingPrice: "₹500/trip",
    },
    {
      icon: MapPin,
      title: "Vacation Packages",
      description:
        "Customized vacation packages for families, couples, and groups to explore Rajasthan's heritage and beauty.",
      features: [
        "Customized itinerary planning",
        "Accommodation arrangements",
        "Local sightseeing tours",
        "Photography and guide services",
        "Complete travel assistance",
      ],
      popular: true,
      startingPrice: "₹25,000/package",
    },
    {
      icon: Plane,
      title: "Airport Transfers",
      description:
        "Reliable airport pickup and drop services to and from Jodhpur Airport and other major airports in Rajasthan.",
      features: [
        "Punctual pickup and drop service",
        "Flight monitoring for delays",
        "Meet and greet service",
        "Luggage assistance",
        "Clean and comfortable vehicles",
      ],
      popular: false,
      startingPrice: "₹800/trip",
    },
    {
      icon: Building,
      title: "Corporate Travel",
      description:
        "Comprehensive travel solutions for business travelers, corporate meetings, and company outings.",
      features: [
        "Executive car rentals",
        "Conference and meeting arrangements",
        "Team building activities",
        "Corporate event planning",
        "Bulk booking discounts",
      ],
      popular: false,
      startingPrice: "₹12/km",
    },
    {
      icon: Users,
      title: "Group Tours",
      description:
        "Specialized group travel services for families, friends, and large groups exploring Rajasthan together.",
      features: [
        "Customized group itineraries",
        "Group discounts and offers",
        "Coordinated travel plans",
        "Experienced tour guides",
        "Comfortable group transportation",
      ],
      popular: false,
      startingPrice: "₹2,000/person",
    },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Safety & Security",
      description:
        "All our vehicles are regularly inspected and our drivers are background verified for your peace of mind.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you with any queries or emergencies during your journey.",
    },
    {
      icon: Star,
      title: "Premium Service",
      description:
        "Top-quality vehicles, professional drivers, and personalized service to make your travel memorable.",
    },
    {
      icon: DollarSign,
      title: "Best Rates",
      description:
        "Competitive pricing without compromising on quality. Transparent pricing with no hidden charges.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="sr-only relative bg-gradient-to-br from-red-50 via-white to-rose-50 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Our Travel{" "}
              <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Comprehensive travel solutions tailored to your needs. From car
              rentals to vacation packages, we ensure every journey is
              comfortable, safe, and memorable.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Insured Vehicles</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Verified Drivers</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8"
            >
              Book Your Service Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="sr-only py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Offerings
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our wide range of travel services designed to cater to
              all your transportation and tourism needs in Rajasthan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-shadow duration-300 ${
                  service.popular ? "ring-2 ring-red-200" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle className="text-center text-xl mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-red-600">
                      Starting from {service.startingPrice}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    variant={service.popular ? "default" : "outline"}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="sr-only py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Gurukripa Tours?
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart and why thousands of customers trust
              us for their travel needs in Rajasthan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (existing component) */}
      <Services />

      {/* CTA Section */}
      <section className="sr-only py-20 bg-gradient-to-r from-red-600 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Perfect Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your travel requirements and get a
            customized quote for your Rajasthan adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              <Phone className="w-4 h-4 mr-2" />
              Call Now: +91-XXXX-XXXXXX
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 px-8"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Travel Services",
            description:
              "Comprehensive travel services offered by Gurukripa Tours in Jodhpur, Rajasthan",
            itemListElement: mainServices.map((service, index) => ({
              "@type": "Service",
              position: index + 1,
              name: service.title,
              description: service.description,
              provider: {
                "@type": "TravelAgency",
                name: "Gurukripa Tours",
              },
              areaServed: "Rajasthan, India",
              offers: {
                "@type": "Offer",
                priceRange: service.startingPrice,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
