"use client";

import { loadWhop } from "@whop/elements";
import { Checkout, CheckoutElement, WhopElements } from "@whop/elements-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { VisitorData } from "./Mailchimp";

interface EmbeddedCheckoutProps {
  email: string;
  visitorData: VisitorData;
  onClose: () => void;
}

export function EmbeddedCheckout({
  email,
  visitorData,
  onClose,
}: EmbeddedCheckoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,

        width: "100vw",
        height: "100dvh",

        background: "rgba(0, 0, 0, 0.96)",
        overflow: "hidden",

        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",

        borderRadius: 24,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close checkout"
        style={{
          position: "absolute",
          top: "max(16px, env(safe-area-inset-top))",
          right: "max(16px, env(safe-area-inset-right))",
          zIndex: 10,

          width: 44,
          height: 44,

          border: "none",
          borderRadius: "999px",

          background: "rgba(255, 255, 255, 0.12)",
          color: "#fff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: 28,
          lineHeight: 1,

          cursor: "pointer",

          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        ×
      </button>

      <div
        style={{
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,

          overflowY: "auto",
          overflowX: "hidden",

          boxSizing: "border-box",

          paddingTop: "max(24px, env(safe-area-inset-top))",
          paddingRight: "max(24px, env(safe-area-inset-right))",
          paddingBottom: "max(24px, env(safe-area-inset-bottom))",
          paddingLeft: "max(24px, env(safe-area-inset-left))",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            minHeight: "100%",

            margin: "0 auto",

            boxSizing: "border-box",

            display: "flex",
            flexDirection: "column",
          }}
        >
          <WhopElements
            elements={loadWhop()}
            appearance={{
              theme: {
                appearance: "dark",
              },
              classes: {
                "whop-Checkout": {
                  width: "100%",
                },
                "whop-CheckoutLayout": {
                  width: "100%",
                },
              },
            }}
          >
            <Checkout
              plan="plan_lR3qQD57fpV7O"
              affiliateCode="rokitg"
              attribution={{
                source: "rokitg.com",
              }}
              metadata={{
                id: visitorData.identifier,
                capturedEmail: email,
                timestamp: visitorData.timestamp,
                userAgent: visitorData.userAgent,
                language: visitorData.language,
                languages: visitorData.languages,
                platform: visitorData.platform,
                screen: visitorData.screen,
                ip: visitorData.ip,
                referrer: visitorData.referrer,
                page: visitorData.page,
                timezone: visitorData.timezone,
              }}
              returnUrl="https://whop.com/rokitg"
            >
              <CheckoutElement className="rounded-lg" />
            </Checkout>
          </WhopElements>
        </div>
      </div>
    </div>,
    document.body,
  );
}
