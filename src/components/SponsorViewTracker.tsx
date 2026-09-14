"use client";

import { trackWhopEvent, WHOP_EVENTS } from "@/lib/whop";
import { useEffect } from "react";

type SponsorViewTrackerProps = {
  sponsor: "basedbot" | "fomo";
  destination: string;
};

export function SponsorViewTracker({ sponsor, destination }: SponsorViewTrackerProps) {
  useEffect(() => {
    trackWhopEvent(
      sponsor === "basedbot"
        ? WHOP_EVENTS.basedBotSponsorViewed
        : WHOP_EVENTS.fomoSponsorViewed,
      { sponsor, destination },
    );
  }, [destination, sponsor]);

  return null;
}
