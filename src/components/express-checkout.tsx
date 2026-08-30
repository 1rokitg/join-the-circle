"use client";

import { loadWhop } from "@whop/elements";
import {
  Checkout,
  ExpressCheckoutElement,
  WhopElements,
} from "@whop/elements-react";

export function WhopExpressCheckout() {
  return (
    <WhopElements elements={loadWhop()}>
      <Checkout plan="plan_lR3qQD57fpV7O">
        <ExpressCheckoutElement
          layout="auto"
          wallets={["apple_pay", "google_pay"]}
        />
      </Checkout>
    </WhopElements>
  );
}
