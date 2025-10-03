import React from "react";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Header } from "@/components/header";
import { ReduxProvider } from "@/components/providers/redux-provider";
import AOSProvider from "@/components/providers/AOSProvider";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ui/scroll-to-top";
import "./../globals.css";

export const metadata = {
  title: {
    default:
      "Gurukripa Tours - Premier Travel Agency in Jodhpur | Car, Bus & Vacation Booking",
    template: "%s | Gurukripa Tours",
  },
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
    "rajasthan tourism",
    "jodhpur sightseeing",
    "desert safari jodhpur",
    "heritage tours rajasthan",
    "luxury car rental jodhpur",
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
    bing: "your-bing-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "travel",
  classification: "Travel Agency",
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jodhpur",
    "geo.position": "26.2389;73.0243",
    ICBM: "26.2389, 73.0243",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <meta
          name="google-site-verification"
          content="4jBIp_u1ex8ub0zCeOXN-UnbczFciy1aAO90vr7yhH8"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />

        {/* Additional meta tags for better SEO */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        {/* Location and business info */}
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Jodhpur" />
        <meta name="geo.position" content="26.2389;73.0243" />
        <meta name="ICBM" content="26.2389, 73.0243" />

        {/* Business contact information */}
        <meta
          name="business:contact_data:street_address"
          content="Your Address"
        />
        <meta name="business:contact_data:locality" content="Jodhpur" />
        <meta name="business:contact_data:region" content="Rajasthan" />
        <meta name="business:contact_data:postal_code" content="342001" />
        <meta name="business:contact_data:country_name" content="India" />
        <meta
          name="business:contact_data:phone_number"
          content="+91-XXXX-XXXXXX"
        />

        {/* Structured data for the organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Gurukripa Tours",
              alternateName: "GuruKripa Travel Agency",
              url: "https://tour-web-eta.vercel.app",
              logo: "https://tour-web-eta.vercel.app/logo.png",
              description:
                "Premier travel agency in Jodhpur offering car rentals, bus booking, vacation packages, and transport services across Rajasthan.",
              foundingDate: "2020",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Your Street Address",
                addressLocality: "Jodhpur",
                addressRegion: "Rajasthan",
                postalCode: "342001",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXXX-XXXXXX",
                contactType: "customer service",
                availableLanguage: "English, Hindi",
              },
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
                "Airport Transfers",
                "Local Sightseeing",
              ],
              priceRange: "$$",
              openingHours: "Mo-Su 00:00-23:59",
              sameAs: [
                "https://facebook.com/gurukripatours",
                "https://instagram.com/gurukripatours",
                "https://linkedin.com/company/gurukripatours",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Travel Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Car Rental",
                      description: "Premium car rental services in Jodhpur",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Bus Booking",
                      description:
                        "Comfortable bus ticket booking across Rajasthan",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Vacation Packages",
                      description: "Customized vacation and tour packages",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={` flex  flex-col `}>
        <ReduxProvider>
          <AOSProvider>
            <Toaster />
            <Header />
            {children}
            <EnhancedFooter />
            <ScrollToTop />
          </AOSProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
