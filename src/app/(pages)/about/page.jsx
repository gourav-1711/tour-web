import { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata = {
  title: "About Gurukripa Tours - Leading Travel Agency in Jodhpur, Rajasthan",
  description:
    "Learn about Gurukripa Tours, Jodhpur's premier travel agency since 2020. Discover our story, team, and commitment to providing exceptional car rental, bus booking, and vacation packages across Rajasthan.",
  keywords: [
    "about Gurukripa Tours",
    "Jodhpur travel agency history",
    "Gurukripa Tours team",
    "travel company Jodhpur",
    "Rajasthan travel services",
    "car rental company Jodhpur",
    "bus booking agency Rajasthan",
    "vacation packages company",
    "travel agency experience",
    "Jodhpur tourism company",
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
    canonical: "/about",
  },
  openGraph: {
    title:
      "About Gurukripa Tours - Leading Travel Agency in Jodhpur, Rajasthan",
    description:
      "Learn about Gurukripa Tours, Jodhpur's premier travel agency since 2020. Discover our story, team, and commitment to providing exceptional travel services across Rajasthan.",
    url: "https://tour-web-eta.vercel.app/about",
    siteName: "Gurukripa Tours",
    images: [
      {
        url: "/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Gurukripa Tours - Travel Agency in Jodhpur",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Gurukripa Tours - Leading Travel Agency in Jodhpur",
    description:
      "Learn about Gurukripa Tours, Jodhpur's premier travel agency since 2020.",
    images: ["/about-og-image.jpg"],
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

export default function About() {
  return <AboutPage />;
}
