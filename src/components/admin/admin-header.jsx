"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { LogOut, User } from "lucide-react";

export function AdminHeader({ title, description }) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-md md:text-xl font-semibold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground md:block hidden">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground md:gap-2 md:text-base">
            <User className="h-4 w-4" />
            <span>Admin User</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
