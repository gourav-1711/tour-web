"use client";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState , useEffect } from "react";

export const Header = () => {
  const [open , setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  
  
  const navLinks = [
    { name: "Home", href: "/#" },
    { name: "About", href: "/#about" },
    { name: "Booking", href: "/booking" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/contact" },
  ];
  useEffect(() => {
    // get the hash from the URL
    const hash = window.location.hash;

    if (hash) {
      // find the element with the same ID
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);
  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png" // replace with your logo
            alt="Logo"
            width={40}
            height={40}
            className="rounded object-cover size-10 md:size-14"
          />
          <span className="font-bold text-lg sr-only">Cab Service</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-red-500 font-medium relative group"
            >
              {link.name}
              {/* line hover effect */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[3px] border-transparent group-hover:border-red-500 rounded-b-2xl group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu (Sheet) */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="cursor-pointer">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <SheetTitle className={"sr-only"}>
                  Mobile Menu
              </SheetTitle>
              <SheetDescription className={"sr-only"}>
                  website and pages description
              </SheetDescription>
              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-800 hover:text-red-500 "
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
