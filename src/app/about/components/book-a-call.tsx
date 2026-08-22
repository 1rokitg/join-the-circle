"use client";

import { IconButton } from "@once-ui-system/core";

declare global {
  interface Window {
    gtagSendEvent?: (url: string) => boolean;
  }
}

interface TrackedCalendarButtonProps {
  href: string;
}

export default function TrackedCalendarButton({
  href,
}: TrackedCalendarButtonProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (typeof window.gtagSendEvent === "function") {
      window.gtagSendEvent(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <IconButton
      href={href}
      data-border="rounded"
      variant="secondary"
      icon="chevronRight"
      onClick={handleClick}
    />
  );
}
