"use client";

import { useEffect, useState } from "react";

const VISITOR_SEED_KEY = "rokitg-visitor-avatar-seed";

export function VisitorAvatar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let seed = window.localStorage.getItem(VISITOR_SEED_KEY);
    if (!seed) {
      seed = window.crypto.randomUUID();
      window.localStorage.setItem(VISITOR_SEED_KEY, seed);
    }
    setAvatarUrl(`https://avatar.vercel.sh/${encodeURIComponent(seed)}.svg`);
  }, []);

  return (
    <img
      src={avatarUrl ?? "https://avatar.vercel.sh/rokitg.svg"}
      alt="Your visitor avatar"
      width={32}
      height={32}
      style={{ borderRadius: "8px" }}
    />
  );
}
