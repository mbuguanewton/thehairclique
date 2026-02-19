"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Check if there's a hash in the URL on load
    const hash = window.location.hash;
    if (hash) {
      // Delay slightly to ensure content is rendered
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
}
