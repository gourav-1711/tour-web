import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/redux-provider";
import AOSProvider from "@/components/providers/AOSProvider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
            <main className="flex-1">{children}</main>
            <Footer />
          </AOSProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
