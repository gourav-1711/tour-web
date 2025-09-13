"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";
import {
  Home,
  Calendar,
  LogOut,
  Shield,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin-panel/dashboard/home",
    icon: Home,
  },
  {
    name: "Bookings",
    href: "/admin-panel/dashboard/bookings",
    icon: Calendar,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className=" w-[4.5%] h-full z-50 group border-r border-sidebar-border"
        onMouseEnter={() => setOpen(true)}
        
      >
        <Button
          variant="ghost"
          onClick={() => setOpen(!open)}
          className=" flex justify-center  bg-sidebar group-hover:bg-sidebar-accent"
        >
          <Menu className="size-6" />
        </Button>
      </div>
      <div
      onMouseLeave={() => setOpen(false)}
        className={cn(
          "fixed top-0 left-0 z-50  flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border transition-all duration-700 ease-in-out",
          open ? "left-0" : "-left-full"
        )}
      >
        {/* close */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="w-full flex justify-end px-5 py-2"
        >
          <X className="w-6 h-6" />
        </Button>
        <div>
          {/* Header */}
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Shield className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                Admin Panel
              </span>
              <span className="text-xs text-sidebar-foreground/60">
                Booking Management
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      isActive &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
