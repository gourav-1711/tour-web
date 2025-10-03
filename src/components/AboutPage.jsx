import React from "react";
import About from "@/components/section/About";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Award,
  Users,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const values = [
    
  ];

  const achievements = [
    "Voted Best Travel Agency in Jodhpur 2023",
    "ISO 9001:2015 Certified Company",
    "Member of Rajasthan Tourism Development Corporation",
    "Trusted by 10,000+ Happy Customers",
    "24/7 Customer Support Excellence Award",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="sr-only relative bg-gradient-to-br from-red-50 via-white to-rose-50 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Gurukripa Tours
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Established in 2020, we've been crafting unforgettable travel
              experiences across Rajasthan, connecting people with the rich
              heritage and beauty of the land of kings.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="w-4 h-4 text-red-600" />
                <span>10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Award className="w-4 h-4 text-red-600" />
                <span>5+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Values Section */}
      <section className="sr-only py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every aspect of our service and drive us
              to deliver exceptional travel experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="sr-only py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition and milestones that reflect our commitment to
              excellence in travel services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sr-only py-20 bg-gradient-to-r from-red-600 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience the Gurukripa Difference
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered Rajasthan
            with us. Let's make your travel dreams a reality.
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
              <Mail className="w-4 h-4 mr-2" />
              Get Free Consultation
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
            "@type": "AboutPage",
            mainEntity: {
              "@type": "TravelAgency",
              name: "Gurukripa Tours",
              foundingDate: "2020",
              description:
                "Premier travel agency in Jodhpur offering car rentals, bus booking, vacation packages, and transport services across Rajasthan.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jodhpur",
                addressRegion: "Rajasthan",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXXX-XXXXXX",
                contactType: "customer service",
              },
              founder: {
                "@type": "Person",
                name: "Rajesh Sharma",
              },
              numberOfEmployees: "25",
              areaServed: "Rajasthan, India",
              award: [
                "Best Travel Agency in Jodhpur 2023",
                "ISO 9001:2015 Certified Company",
              ],
            },
          }),
        }}
      />
    </div>
  );
}
