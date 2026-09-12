"use client";

import { Text } from "@once-ui-system/core";
import { useEffect, useRef, useState } from "react";

type FomoRankResponse = {
  available: boolean;
  rank?: number;
};

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;
const COUNT_UP_DURATION_MS = 700;

export function FomoRank() {
  const [rank, setRank] = useState<number | null>(null);
  const [displayRank, setDisplayRank] = useState(0);
  const previousRank = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const loadRank = async () => {
      try {
        const response = await fetch("/api/fomo-rank");
        const data = (await response.json()) as FomoRankResponse;

        if (!cancelled && data.available && data.rank) {
          setRank(data.rank);
        }
      } catch {
        // Keep the CTA usable when the Apple ranking feed is unavailable.
      }
    };

    void loadRank();
    const interval = window.setInterval(
      () => void loadRank(),
      REFRESH_INTERVAL_MS,
    );

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (rank === null) return;

    const start = previousRank.current;
    const change = rank - start;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / COUNT_UP_DURATION_MS, 1);
      setDisplayRank(Math.round(start + change * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousRank.current = rank;
      }
    };

    const frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [rank]);

  if (rank === null) {
    return <Text as="span">Ranking en directo</Text>;
  }

  return (
    <Text as="span" aria-live="polite">
      #{displayRank} Finanzas gratis ES
    </Text>
  );
}