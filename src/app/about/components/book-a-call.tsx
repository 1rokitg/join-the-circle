"use client";

import { IconButton } from "@once-ui-system/core";

declare global {
  interface Window {
    gtagSendEvent?: (url: string) => boolean;
    whop?: {
      track: (event: string) => void;
    };
  }
}

interface TrackedCalendarButtonProps {
  href: string;
}

export default function TrackedCalendarButton({
  href,
}: TrackedCalendarButtonProps) {
  const handleClick = (event: React.MouseEvent) => {
    window.whop?.track("book_a_call_click");
    event.preventDefault();

    if (typeof window.gtagSendEvent === "function") {
      window.gtagSendEvent(href);
    } else {
      window.location.href = href;
    }
  };

  window.whop?.track("about_page_view");

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
