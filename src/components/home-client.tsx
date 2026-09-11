"use client";

import { useState } from "react";
import { CallToAction } from "@/components/cta";
import { EmbeddedCheckout } from "@/components/checkout";

export function HomeCheckout() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <CallToAction
        trustBadges={true}
        onCheckout={() => setCheckoutOpen(true)}
      />

      <EmbeddedCheckout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
