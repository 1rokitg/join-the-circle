import { flag } from "flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";

export const trustBadges = flag({
  key: "trust-badges",
  adapter: vercelAdapter(),
});
