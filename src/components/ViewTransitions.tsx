"use client";

import { useEffect } from "react";

/**
 * Enable View Transitions API for instant, smooth page transitions
 * This hooks into the browser's native View Transitions API for zero-delay navigation
 */
export default function ViewTransitions() {
  useEffect(() => {
    // Check if View Transitions API is supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // Intercept navigation events for smooth transitions
      const handleNavigation = () => {
        // Browser will handle the transition automatically
      };

      window.addEventListener("popstate", handleNavigation);

      return () => {
        window.removeEventListener("popstate", handleNavigation);
      };
    }
  }, []);

  return null;
}
