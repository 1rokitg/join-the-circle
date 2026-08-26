"use client";

import { mailchimp, newsletter } from "@/resources";
import {
  Button,
  Heading,
  Input,
  Text,
  Background,
  Column,
  Row,
} from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";

declare global {
  interface Window {
    gtagSendEvent?: (url: string) => boolean;
  }
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): T {
  let timeout: ReturnType<typeof setTimeout>;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

interface VisitorData {
  identifier: string;
  email: string;
  timestamp: string;
  userAgent: string;
  language: string;
  languages: string;
  platform: string;
  screen: string;
  ip: string;
  referrer: string;
  page: string;
  timezone: string;
}

export interface Lead {
  identifier: string;
  email: string;
  timestamp: string;
  userAgent: string;
  language: string;
  languages: string[];
  platform: string;
  screen: {
    width: number;
    height: number;
    colorDepth: number;
  };
}

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({
  ...flex
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // log view content

  const handleEmailCollection = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("EMAIL") ?? "").trim();

    if (!submittedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(submittedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const visitorData: VisitorData = {
      identifier: submittedEmail.split("@")[0],
      email: submittedEmail,
      timestamp: new Date().toISOString(),
      userAgent: window.navigator.userAgent,
      language: window.navigator.language,
      languages: window.navigator.languages.join(","),
      platform: window.navigator.platform,
      screen: JSON.stringify(
        typeof window !== "undefined"
          ? {
              width: window.screen.width,
              height: window.screen.height,
              colorDepth: window.screen.colorDepth,
            }
          : {
              width: 0,
              height: 0,
              colorDepth: 0,
            },
      ),
      ip: "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      page: typeof window !== "undefined" ? window.location.href : "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lead: visitorData }),
      });

      if (!response.ok) {
        throw new Error("Failed to push lead: " + response.statusText);
      }

      // ...
      if (
        typeof window !== "undefined" &&
        typeof window.gtagSendEvent === "function"
      ) {
        window.gtagSendEvent("https://rokitg.substack.com/subscribe");
      } else {
        window.location.href = "https://rokitg.substack.com/subscribe";
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  if (newsletter.display === false) return null;

  return (
    <Column
      id="contact-form"
      style={{
        scrollMarginTop: "100px",
      }}
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />

      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {newsletter.title}
        </Heading>

        <Text
          wrap="balance"
          marginBottom="l"
          variant="body-default-l"
          onBackground="neutral-weak"
        >
          {newsletter.description}
        </Text>
      </Column>

      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleEmailCollection}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
      >
        <Row
          id="mc_embed_signup_scroll"
          fillWidth
          maxWidth={24}
          s={{ direction: "column" }}
          gap="8"
        >
          <Input
            id="mce-EMAIL"
            name="EMAIL"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={error}
          />

          <div style={{ display: "none" }}>
            <input
              type="checkbox"
              readOnly
              name="group[3492][1]"
              id="mce-group[3492]-3492-0"
              value=""
              checked
            />
          </div>

          <div id="mce-responses" className="clearfalse">
            <div
              className="response"
              id="mce-error-response"
              style={{ display: "none" }}
            />

            <div
              className="response"
              id="mce-success-response"
              style={{ display: "none" }}
            />
          </div>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-5000px",
            }}
          >
            <input
              type="text"
              readOnly
              name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa"
              tabIndex={-1}
              value=""
            />
          </div>

          <div className="clear">
            <Row height="48" vertical="center">
              <Button
                id="mc-embedded-subscribe"
                value="Subscribe"
                type="submit"
                disabled={isSubmitting}
                size="m"
                fillWidth
              >
                Subscribe
              </Button>
            </Row>
          </div>
        </Row>
      </form>
    </Column>
  );
};
