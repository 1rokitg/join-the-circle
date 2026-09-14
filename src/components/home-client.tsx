"use client";

import { useState } from "react";
import { CallToAction } from "@/components/cta";
import { EmbeddedCheckout } from "@/components/checkout";
import { WHOP_OFFERS } from "@/lib/whop-offers";

export function HomeCheckout() {
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);

  return (
    <>
      <CallToAction
        trustBadges={false}
        onCommunityCheckout={() => setCheckoutPlan(WHOP_OFFERS.freeCommunity.planId)}
        onCheckout={() => setCheckoutPlan(WHOP_OFFERS.paidProgram.planId)}
      />
      <EmbeddedCheckout
        open={checkoutPlan !== null}
        plan={checkoutPlan ?? WHOP_OFFERS.paidProgram.planId}
        onClose={() => setCheckoutPlan(null)}
      />
    </>
  );
}
