import { Badge, Column, Heading, Icon, Row, Text } from "@once-ui-system/core";
import { AppEntryTracker } from "@/components/AppEntryTracker";

export const metadata = {
  title: "RokitG App",
  description: "A focused learning space for beginner traders.",
};

const modules = [
  {
    title: "Trading foundations",
    description: "Build the habits and vocabulary that keep beginners grounded.",
    status: "Starting soon",
    icon: "book" as const,
  },
  {
    title: "Risk before reward",
    description: "Learn how to protect your account before searching for the next setup.",
    status: "Member module",
    icon: "grid" as const,
  },
  {
    title: "Your trading process",
    description: "Turn ideas into a repeatable plan you can actually follow.",
    status: "Member module",
    icon: "person" as const,
  },
];

export default function AppPreviewPage() {
  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingY="12" horizontal="center">
      <AppEntryTracker />
      <Column maxWidth="s" horizontal="center" align="center" gap="m">
        <Badge
          background="brand-alpha-weak"
          border="brand-alpha-medium"
          onBackground="brand-strong"
          radius="full"
          paddingX="8"
          paddingY="4"
        >
          ROKITG APP
        </Badge>
        <Heading wrap="balance" variant="display-strong-l">
          Your trading path is taking shape.
        </Heading>
        <Text
          wrap="balance"
          onBackground="neutral-weak"
          variant="heading-default-xl"
        >
          A focused learning space for beginner traders who want a process before they chase results.
        </Text>
      </Column>

      <Column maxWidth="m" fillWidth gap="s">
        {modules.map((module, index) => (
          <Row
            key={module.title}
            fillWidth
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
            padding="l"
            gap="m"
            vertical="center"
            horizontal="between"
          >
            <Row gap="m" vertical="center">
              <Icon name={module.icon} onBackground={index === 0 ? "brand-strong" : "neutral-weak"} />
              <Column gap="4">
                <Text variant="heading-strong-m">{module.title}</Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {module.description}
                </Text>
              </Column>
            </Row>
            <Text onBackground="neutral-weak" variant="label-default-s">
              {module.status}
            </Text>
          </Row>
        ))}
      </Column>

      <Text align="center" onBackground="neutral-weak" variant="body-default-s">
        The member area is opening in stages. Your public RokitG experience remains available while it grows.
      </Text>
    </Column>
  );
}
