import React from "react";
import { Header } from "@/components/Header";
import EnhancedFooter from "@/components/EnhancedFooter";

export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <EnhancedFooter />
    </div>
  );
}
