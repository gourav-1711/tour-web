import React from "react";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Header } from "@/components/header";


export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <EnhancedFooter />
    </div>
  );
}
