import React from "react";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Header } from "@/components/header";

export default function layout({ children }) {
  return (
    <div>
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
      <EnhancedFooter />
    </div>
  );
}
