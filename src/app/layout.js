import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/redux-provider";
import AOSProvider from "@/components/providers/AOSProvider";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ui/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GuruKripa Travel Agency",
  description:
    "Your trusted partner for comfortable and reliable cab services across Rajasthan. Experience the royal state with our premium travel solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex  flex-col `}>
        <ReduxProvider>
          <AOSProvider>
            <Toaster />
            {children}

            <ScrollToTop />
          </AOSProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
