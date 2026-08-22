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
import { Opacity as opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { put } from "@vercel/blob";

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

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({
  ...flex
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const router = useRouter();

  const handleEmailCollection = async () => {
    // Collect as much user data as possible for fingerprinting
    const visitorData: Record<string, any> = {
      email,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "",
      language: typeof window !== "undefined" ? window.navigator.language : "",
      languages:
        typeof window !== "undefined" ? window.navigator.languages : "",
      platform: typeof window !== "undefined" ? window.navigator.platform : "",
      screen:
        typeof window !== "undefined"
          ? {
              width: window.screen.width,
              height: window.screen.height,
              colorDepth: window.screen.colorDepth,
            }
          : {},
      // Fallback for IP address (requires edge function/serverless function; left as empty here)
      ip: "",
      // Universal ID (use localStorage or generate a UUID)
      visitorId: (() => {
        if (typeof window === "undefined") return "";
        let id = window.localStorage.getItem("visitorId");
        if (!id) {
          id =
            crypto.randomUUID?.() || Math.random().toString(36).substr(2, 12);
          window.localStorage.setItem("visitorId", id);
        }
        return id;
      })(),
      referrer: typeof document !== "undefined" ? document.referrer : "",
      page: typeof window !== "undefined" ? window.location.href : "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    // push lead to vercel blob storage
    try {
      // put visitor data to vercel blob storage
      const lead = await put(
        `leads/${visitorData.visitorId}`,
        JSON.stringify(visitorData, null, 2),
        {
          access: "private",
          contentType: "application/json",
          token: process.env.BLOB_READ_WRITE_TOKEN,
          storeId: process.env.BLOB_STORE_ID,
        },
      );

      // TODO: send telegram alert using tg bot API
    } catch (error) {
      console.error("Error pushing lead to vercel blob storage", error);
    } finally {
      router.push("https://rokitg.substack.com/subscribe");
    }
  };

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

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

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    setTouched(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  if (newsletter.display === false) return null;

  return (
    <Column
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
        action={handleEmailCollection}
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
            formNoValidate
            id="mce-EMAIL"
            name="EMAIL"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              if (error) {
                handleChange(e);
              } else {
                debouncedHandleChange(e);
              }
            }}
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
            ></div>
            <div
              className="response"
              id="mce-success-response"
              style={{ display: "none" }}
            ></div>
          </div>
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-5000px" }}
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
                onClick={() => console.log("email", email)}
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
