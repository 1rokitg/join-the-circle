"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, work, whop } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade
        s={{ hide: true }}
        fillWidth
        position="fixed"
        height="80"
        zIndex={9}
      />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row
          paddingLeft="12"
          fillWidth
          vertical="center"
          textVariant="body-default-s"
        >
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="brand-alpha-medium"
            radius="l"
            shadow="l"
            padding="4"
            gap="4"
            horizontal="center"
            zIndex={1}
            style={{
              backdropFilter: "blur(18px)",
              boxShadow: "0 16px 45px rgba(0, 0, 0, 0.24)",
            }}
          >
            <Row
              gap="4"
              vertical="center"
              textVariant="body-default-s"
              suppressHydrationWarning
            >
              {routes["/"] && (
                <ToggleButton
                  className={styles.compactItem}
                  prefixIcon="home"
                  href="/"
                  label="Home"
                  selected={pathname === "/"}
                />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              <>
                <Row s={{ hide: true }}>
                  <ToggleButton
                    className={styles.compactItem}
                    href="/sponsors/fomo"
                    label={
                      <Row gap="4" vertical="center">
                        <Image
                          src="/images/fomo-logo.png"
                          alt=""
                          width={16}
                          height={16}
                          style={{ borderRadius: "4px" }}
                        />
                        Fomo
                      </Row>
                    }
                    selected={pathname.startsWith("/sponsors/fomo")}
                  />
                </Row>
                <Row hide s={{ hide: false }}>
                  <ToggleButton
                    href="/sponsors/fomo"
                    label={
                      <Image
                        src="/images/fomo-logo.png"
                        alt="Fomo"
                        width={16}
                        height={16}
                        style={{ borderRadius: "4px" }}
                      />
                    }
                    selected={pathname.startsWith("/sponsors/fomo")}
                  />
                </Row>
              </>
              <>
                <Row s={{ hide: true }}>
                  <ToggleButton
                    className={styles.compactItem}
                    href="/sponsors/bb"
                    label={
                      <Row gap="4" vertical="center">
                        <Image
                          src="/images/basedbot-logo.png"
                          alt=""
                          width={16}
                          height={16}
                          style={{ borderRadius: "4px", background: "#fff" }}
                        />
                        Trading Bot
                      </Row>
                    }
                    selected={pathname.startsWith("/sponsors/bb")}
                  />
                </Row>
                <Row hide s={{ hide: false }}>
                  <ToggleButton
                    href="/sponsors/bb"
                    label={
                      <Image
                        src="/images/basedbot-logo.png"
                        alt="Trading Bot"
                        width={16}
                        height={16}
                        style={{ borderRadius: "4px", background: "#fff" }}
                      />
                    }
                    selected={pathname.startsWith("/sponsors/bb")}
                  />
                </Row>
              </>
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className={styles.compactItem}
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/whop"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className={styles.compactItem}
                      prefixIcon="whop"
                      href="/whop"
                      label={whop.label}
                      selected={pathname.startsWith("/whop")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="whop"
                      href="/whop"
                      selected={pathname.startsWith("/whop")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
