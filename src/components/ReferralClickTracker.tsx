"use client";

import { useEffect } from "react";
import { trackWhopEvent, WHOP_EVENTS } from "@/lib/whop";

export function ReferralClickTracker() {
  useEffect(() => {
    function trackReferralClick(event: MouseEvent) {
      if (event.type === "auxclick" ? event.button !== 1 : event.button !== 0) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const destination = new URL(link.href, window.location.href);
      if (
        destination.hostname !== "fomo.family" ||
        !destination.pathname.startsWith("/r/") ||
        !destination.pathname.slice(3)
      ) return;

      trackWhopEvent(WHOP_EVENTS.fomoReferralClicked, {
        sponsor: "fomo",
        destination: destination.origin + destination.pathname,
        link_label: (
          link.getAttribute("aria-label") ||
          link.textContent?.trim() ||
          link.querySelector("img")?.alt ||
          "Fomo"
        ).slice(0, 100),
      });
    }

    document.addEventListener("click", trackReferralClick, true);
    document.addEventListener("auxclick", trackReferralClick, true);
    return () => {
      document.removeEventListener("click", trackReferralClick, true);
      document.removeEventListener("auxclick", trackReferralClick, true);
    };
  }, []);

  return null;
}
