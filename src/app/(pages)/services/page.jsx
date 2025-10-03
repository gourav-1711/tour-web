import { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";

export const metadata = {
  title:
    "Travel Services in Jodhpur | Car Rental, Bus Booking & Vacation Packages | Gurukripa Tours",
  description:
    "Discover comprehensive travel services in Jodhpur with Gurukripa Tours. Premium car rentals, comfortable bus bookings, customized vacation packages, and reliable transport services across Rajasthan.",
  keywords: [
    "car rental Jodhpur",
    "bus booking Rajasthan",
    "vacation packages Jodhpur",
    "taxi service Jodhpur",
    "travel services Rajasthan",
    "transport services Jodhpur",
    "car hire Jodhpur",
    "bus tickets Rajasthan",
    "holiday packages Jodhpur",
    "cab booking Jodhpur",
    "tourist transport Rajasthan",
    "luxury car rental Jodhpur",
    "AC bus booking Rajasthan",
    "family vacation packages",
    "corporate travel services",
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
    canonical: "/services",
  },
  openGraph: {
    title:
      "Travel Services in Jodhpur | Car Rental, Bus Booking & Vacation Packages | Gurukripa Tours",
    description:
      "Discover comprehensive travel services in Jodhpur with Gurukripa Tours. Premium car rentals, comfortable bus bookings, customized vacation packages, and reliable transport services across Rajasthan.",
    url: "https://tour-web-eta.vercel.app/services",
    siteName: "Gurukripa Tours",
    images: [
      {
        url: "/services-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Travel Services in Jodhpur - Gurukripa Tours",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Travel Services in Jodhpur | Car Rental, Bus Booking & Vacation Packages",
    description:
      "Discover comprehensive travel services in Jodhpur with Gurukripa Tours.",
    images: ["/services-og-image.jpg"],
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
};

export default function Services() {
  return <ServicesPage />;
}
