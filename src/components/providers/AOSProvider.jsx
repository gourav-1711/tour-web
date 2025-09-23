"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "cubic-bezier(0.645, 0.045, 0.355, 1.0)",
      once: true,
      mirror: false,
      anchorPlacement : "top-top",
      offset: 100,
    });
  }, []);

  return <>{children}</>;
}
