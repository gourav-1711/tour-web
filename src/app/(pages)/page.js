import About from "@/components/section/About";
import Banner from "@/components/section/Banner";

import Destination from "@/components/section/Destination";
import Fleet from "@/components/section/Fleet";
import Offer from "@/components/section/Offer";
import Services from "@/components/section/Services";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bus, Car, MapPin, Users } from "lucide-react";

export const metadata = {
  title:
    "Gurukripa Tours - Premier Travel Agency in Jodhpur | Car, Bus & Vacation Booking",
  description:
    "Book reliable car rentals, bus tickets, and vacation packages in Jodhpur, Rajasthan. Gurukripa Tours offers premium travel services including taxi booking, family tours, and transport solutions across Rajasthan.",
  keywords: [
    "Jodhpur travel agency",
    "car rental Jodhpur",
    "bus booking Rajasthan",
    "vacation packages Jodhpur",
    "taxi service Jodhpur",
    "family tours Rajasthan",
    "transport services Jodhpur",
    "travel booking Rajasthan",
    "tour packages Jodhpur",
    "cab service Rajasthan",
  ],
  authors: [{ name: "Gurukripa Tours" }],
  creator: "Gurukripa Tours",
  publisher: "Gurukripa Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tour-web-eta.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Gurukripa Tours - Premier Travel Agency in Jodhpur | Car, Bus & Vacation Booking",
    description:
      "Book reliable car rentals, bus tickets, and vacation packages in Jodhpur, Rajasthan. Premium travel services including taxi booking, family tours, and transport solutions.",
    url: "https://tour-web-eta.vercel.app",
    siteName: "Gurukripa Tours",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gurukripa Tours - Travel Agency in Jodhpur",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurukripa Tours - Premier Travel Agency in Jodhpur",
    description:
      "Book reliable car rentals, bus tickets, and vacation packages in Jodhpur, Rajasthan.",
    images: ["/og-image.jpg"],
    creator: "@gurukripatours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};
export default function Home() {
  return (
    <>
      <Banner />
      {/* Hero Section */}

      <Destination />
      <Fleet />
      <Offer />
      <Services />
      <About />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Gurukripa Tours",
            url: "https://tour-web-eta.vercel.app",
            logo: "https://tour-web-eta.vercel.app/logo.png",
            description:
              "Premier travel agency in Jodhpur offering car rentals, bus booking, vacation packages, and transport services across Rajasthan.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Jodhpur",
              addressRegion: "Rajasthan",
              addressCountry: "IN",
            },
            telephone: "+91-XXXX-XXXXXX",
            areaServed: {
              "@type": "Place",
              name: "Rajasthan, India",
            },
            serviceType: [
              "Car Rental",
              "Bus Booking",
              "Vacation Packages",
              "Family Tours",
              "Transport Services",
            ],
            priceRange: "$$",
            openingHours: "Mo-Su 00:00-23:59",
            sameAs: [
              "https://facebook.com/gurukripatours",
              "https://instagram.com/gurukripatours",
            ],
          }),
        }}
      />
    </>
  );
}
