"use client";

import { newsletter } from "@/resources";
import { Button, Column, Text } from "@once-ui-system/core";
import Image from "next/image";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    whop?: {
      track?: (event: string, data: Record<string, any>) => void;
    };
  }
}

export const CallToAction: React.FC<
  React.ComponentProps<typeof Column> & { trustBadges: boolean }
> = ({ trustBadges, ...flex }) => {
  const [isHovered, setIsHovered] = useState(false);

  const videoId = "b4vnWgUmAa8";
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    window.whop?.track?.("add_to_cart", { content: "cta_button" });
  }, []);

  /**
   * The form lives in another section.
   * This component ONLY handles getting the visitor there.
   */
  const scrollToForm = () => {
    const form = document.getElementById("contact-form");

    if (!form) return;

    form.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (newsletter.display === false) {
    return null;
  }

  return (
    <Column
      overflow="hidden"
      radius="l"
      horizontal="center"
      align="center"
      {...flex}
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      {/* =========================================================
          VIDEO SALES LETTER
      ========================================================== */}

      <Column
        horizontal="center"
        align="center"
        style={{
          width: "100%",
          maxWidth: 950,
        }}
      >
        {trustBadges && (
          <Image
            src="/images/trust-badges.webp"
            alt="Trust Badges"
            width={462}
            height={70}
            style={{
              width: "80%",
              height: "auto",
            }}
          />
        )}
        {/* VIDEO */}
        <button
          type="button"
          onClick={scrollToForm}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label="Ver la clase gratis y continuar"
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            padding: 0,
            border: "2px solid #ed1238",
            borderRadius: 16,
            overflow: "hidden",
            cursor: "pointer",
            background: "#050505",
            boxShadow: isHovered
              ? "0 24px 70px rgba(237,18,56,0.28)"
              : "0 15px 45px rgba(0,0,0,0.35)",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 250ms ease, box-shadow 250ms ease",
          }}
        >
          {/* Thumbnail */}
          <img
            src={thumbnail}
            alt="Clase gratuita de ecommerce"
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.035)" : "scale(1)",
              transition: "transform 600ms ease",
            }}
          />

          {/* Dark cinematic overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(
                  180deg,
                  rgba(0,0,0,0.10) 0%,
                  rgba(0,0,0,0.05) 40%,
                  rgba(0,0,0,0.75) 100%
                )
              `,
            }}
          />

          {/* Top player UI */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 18px",
            }}
          >
            {/* LIVE / CLASS badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 11px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ed1238",
                  boxShadow: "0 0 12px rgba(237,18,56,0.9)",
                }}
              />
              CLASE GRATIS
            </div>

            {/* Duration */}
            <div
              style={{
                padding: "7px 11px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              12:47
            </div>
          </div>

          {/* PLAY BUTTON */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(72px, 9vw, 104px)",
              height: "clamp(72px, 9vw, 104px)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ed1238",
              boxShadow: `
                0 12px 35px rgba(0,0,0,0.45),
                0 0 0 10px rgba(237,18,56,0.18),
                0 0 0 20px rgba(237,18,56,0.08)
              `,
              transition: "transform 220ms ease",
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              aria-hidden="true"
              style={{
                marginLeft: 4,
                transform: isHovered ? "scale(1.12)" : "scale(1)",
                transition: "transform 220ms ease",
              }}
            >
              <path d="M14 9.5L29 19L14 28.5V9.5Z" fill="white" />
            </svg>
          </div>

          {/* Bottom player area */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "20px 22px 18px",
              color: "#fff",
              textAlign: "left",
            }}
          >
            {/* Fake progress bar */}
            <div
              style={{
                width: "100%",
                height: 3,
                marginBottom: 12,
                borderRadius: 99,
                background: "rgba(255,255,255,0.28)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "31%",
                  height: "100%",
                  borderRadius: 99,
                  background: "#ed1238",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(13px, 1.5vw, 16px)",
                  fontWeight: 600,
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                Cómo empecé desde cero
              </span>

              <span
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                  whiteSpace: "nowrap",
                }}
              >
                ▶ Ver ahora
              </span>
            </div>
          </div>
        </button>

        {/* =========================================================
            CTA
        ========================================================== */}

        <Column
          horizontal="center"
          align="center"
          gap="m"
          style={{
            width: "100%",
            marginTop: 18,
          }}
        >
          <Button
            type="button"
            onClick={scrollToForm}
            size="l"
            variant="primary"
            style={{
              width: "100%",
              minHeight: 64,
              borderRadius: 10,
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 800,
              letterSpacing: "0.01em",
              boxShadow: "0 10px 35px rgba(237,18,56,0.28)",
              transition: "transform 180ms ease, box-shadow 180ms ease",
            }}
          >
            RECIBIR CLASE GRATIS YA ↓
          </Button>

          <Text
            onBackground="neutral-weak"
            style={{
              fontSize: 13,
              textAlign: "center",
              opacity: 0.75,
            }}
          >
            Introduce tu correo electrónico y te enviaré un enlace para ver la
            clase gratis.
          </Text>
        </Column>
      </Column>
    </Column>
  );
};
