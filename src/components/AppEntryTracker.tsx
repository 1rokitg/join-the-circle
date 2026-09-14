"use client";

import { trackWhopEvent, WHOP_EVENTS } from "@/lib/whop";
import { useEffect } from "react";

export function AppEntryTracker() {
  useEffect(() => {
    const entry = new URLSearchParams(window.location.search).get("entry");

    trackWhopEvent(WHOP_EVENTS.appEntryStarted, {
      entry_point:
        entry === "profile" ? "header_profile_icon" : entry === "login" ? "header_login" : "direct",
    });
  }, []);

  return null;
}
