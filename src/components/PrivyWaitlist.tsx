"use client";

import { PrivyProvider, usePrivy, useLogin } from "@privy-io/react-auth";
import { Button, Column, Text } from "@once-ui-system/core";

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

function WaitlistButton() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();

  if (authenticated) {
    return <Text onBackground="accent-strong" variant="label-default-s">You’re on the waitlist</Text>;
  }

  return (
    <Button
      variant="primary"
      color="accent-strong"
      prefixIcon="rocket"
      disabled={!ready}
      onClick={login}
    >
      Waitlist
    </Button>
  );
}

export function PrivyWaitlist() {
  if (!appId) {
    return (
      <Column gap="8">
        <Button variant="primary" color="accent-strong" prefixIcon="rocket" disabled>
          Waitlist
        </Button>
        <Text onBackground="neutral-weak" variant="body-default-xs">
          Add NEXT_PUBLIC_PRIVY_APP_ID to enable registration.
        </Text>
      </Column>
    );
  }

  return (
    <PrivyProvider appId={appId} config={{ loginMethods: ["email"] }}>
      <WaitlistButton />
    </PrivyProvider>
  );
}
