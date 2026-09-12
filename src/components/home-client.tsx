"use client";

import { useState } from "react";
import { CallToAction } from "@/components/cta";
import { EmbeddedCheckout } from "@/components/checkout";

const FREE_COMMUNITY_PLAN = "plan_6hY35QLQssD74";
const PAID_PROGRAM_PLAN = "plan_PgzidF1TD8ASv";

export function HomeCheckout() {
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);

  return (
    <>
      <CallToAction
        trustBadges={true}
        onCommunityCheckout={() => setCheckoutPlan(FREE_COMMUNITY_PLAN)}
        onCheckout={() => setCheckoutPlan(PAID_PROGRAM_PLAN)}
      />
      <EmbeddedCheckout
        open={checkoutPlan !== null}
        plan={checkoutPlan ?? PAID_PROGRAM_PLAN}
        onClose={() => setCheckoutPlan(null)}
      />
    </>
  );
}