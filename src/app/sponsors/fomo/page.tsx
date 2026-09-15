import { Button, Column, Heading, Text } from "@once-ui-system/core";
import Image from "next/image";

const FOMO_URL = "https://fomo.family/r/rokitg";

export const metadata = {
  title: "Fomo | RokitG",
  description: "Explore Fomo, the social crypto trading app.",
};

export default function FomoSponsorPage() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Column maxWidth="s" horizontal="center" align="center" gap="m">
        <Heading wrap="balance" variant="display-strong-l">
          Fomo
        </Heading>
        <Text
          wrap="balance"
          onBackground="neutral-weak"
          variant="heading-default-xl"
        >
          Explore the social crypto trading app built for trading from anywhere.
        </Text>
      </Column>

      <Column maxWidth="m" fillWidth horizontal="center" gap="m">
        <a
          href={FOMO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Explore Fomo"
          style={{
            display: "flex",
            width: "100%",
            minHeight: "20rem",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "16px",
            border: "2px solid rgba(129, 135, 255, 0.55)",
            background:
              "radial-gradient(circle at center, rgba(129, 135, 255, 0.28), rgba(12, 10, 31, 0.96) 65%)",
            boxShadow: "0 18px 48px rgba(97, 91, 230, 0.24)",
          }}
        >
          <Image
            src="/images/fomo-logo.png"
            alt="Fomo"
            width={180}
            height={180}
            style={{ borderRadius: "28px" }}
          />
        </a>
        <Button
          href={FOMO_URL}
          target="_blank"
          prefixIcon="arrowUpRight"
          size="l"
        >
          EXPLORE FOMO
        </Button>
      </Column>
    </Column>
  );
}
