import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  Shield,
  Car,
} from "lucide-react";
import Link from "next/link";

export default function EnhancedFooter() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-50 to-white text-gray-800 relative overflow-hidden border-t border-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-50 to-pink-50"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-100 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6" data-aos="fade-right">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  GuruKripa
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your trusted partner for comfortable and reliable cab services
                  across Rajasthan. Experience the royal state with our premium
                  travel solutions.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="text-2xl font-bold text-red-500">500+</div>
                  <div className="text-sm text-gray-500">Happy Customers</div>
                </div>
                <div
                  className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <div className="text-2xl font-bold text-red-500">24/7</div>
                  <div className="text-sm text-gray-500">Available</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Book Now", href: "/booking" },
                  { name: "Our Fleet", href: "/#fleet" },
                  { name: "Destinations", href: "/#destinations" },
                  { name: "About Us", href: "/#about" },
                  { name: "Contact", href: "/contact" },
                ].map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-600 hover:text-red-600 transition-colors duration-300 hover:translate-x-2 transform hover:font-medium cursor-pointer"
                    data-aos="fade-right"
                    data-aos-delay={`${(idx + 1) * 10}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="150">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Our Services
              </h4>
              <div className="space-y-4">
                <div
                  className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                  data-aos="fade-right"
                  data-aos-delay="50"
                >
                  <Car size={16} className="text-red-500" />
                  <span>Local City Tours</span>
                </div>
                <div
                  className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <MapPin size={16} className="text-red-500" />
                  <span>Outstation Travel</span>
                </div>
                <div
                  className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                  data-aos="fade-right"
                  data-aos-delay="150"
                >
                  <Users size={16} className="text-red-500" />
                  <span>Group Bookings</span>
                </div>
                <div
                  className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <Shield size={16} className="text-red-500" />
                  <span>Airport Transfers</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Get In Touch
              </h4>
              <div className="space-y-4">
                <div
                  className="flex items-start space-x-3"
                  data-aos="fade-right"
                  data-aos-delay="50"
                >
                  <MapPin
                    size={20}
                    className="text-red-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600 text-sm">
                      {process.env.NEXT_PUBLIC_OFFICE_ADDRESS}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start space-x-3"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <Phone
                    size={20}
                    className="text-red-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Call Us</p>
                    <a
                      href={`tel:${process.env.NEXT_PUBLIC_MOBILE_NUMBER}`}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      {process.env.NEXT_PUBLIC_MOBILE_NUMBER}
                    </a>
                    <a
                      href={`tel:${process.env.NEXT_PUBLIC_MOBILE_2}`}
                      className="text-gray-600 hover:text-red-600 transition-colors block"
                    >
                      {process.env.NEXT_PUBLIC_MOBILE_2}
                    </a>
                  </div>
                </div>

                <div
                  className="flex items-start space-x-3"
                  data-aos="fade-right"
                  data-aos-delay="150"
                >
                  <Mail size={20} className="text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <a
                      href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      {process.env.NEXT_PUBLIC_EMAIL}
                    </a>
                  </div>
                </div>

                <div
                  className="flex items-start space-x-3"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <Clock
                    size={20}
                    className="text-red-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Working Hours</p>
                    <p className="text-gray-600 text-sm">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Support Section */}
          <div
            className="mt-16 pt-12 border-t border-gray-200"
            data-aos="fade-up"
          >
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  24/7 Customer Support
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Need assistance? Our dedicated support team is available round
                  the clock to help you with bookings, queries, and travel
                  support. Your comfort is our priority.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_MOBILE_NUMBER}`}
                  className="group flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-red-200"
                  data-aos="zoom-in"
                >
                  <Phone size={20} className="group-hover:animate-pulse" />
                  <span>Call Now: {process.env.NEXT_PUBLIC_MOBILE_NUMBER}</span>
                </a>

                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_MOBILE_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 bg-white text-red-600 border-2 border-red-100 hover:border-red-200 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-gray-100"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <MessageCircle
                    size={20}
                    className="group-hover:animate-bounce"
                  />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Rating Display */}
              <div
                className="flex justify-center items-center space-x-2 pt-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-600">4.8/5 from 500+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-red-50 border-t border-red-100">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} GuruKripa. All rights
                reserved. | Serving Rajasthan with pride
              </div>
              <div className="flex space-x-6 text-sm text-gray-600">
                <Link href="/booking#policy" className="hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
