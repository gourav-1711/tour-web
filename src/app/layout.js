import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/redux-provider";
import AOSProvider from "@/components/providers/AOSProvider";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ui/scroll-to-top";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tour Web App",
  description: "A modern tour booking application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col `}>
        <ReduxProvider>
          <AOSProvider>
            <Header />
            <Toaster />
            <main className="flex-1 overflow-hidden">{children}</main>
            {/* <Footer /> */}
            <EnhancedFooter />
            <ScrollToTop />
          </AOSProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
