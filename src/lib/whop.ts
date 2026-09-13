export const WHOP_EVENTS = {
  leadSubmitted: "lead_submitted",
  communityCheckoutOpened: "community_checkout_opened",
  programCheckoutOpened: "program_checkout_opened",
  videoClicked: "video_clicked",
  youtubeSubscribeClicked: "youtube_subscribe_clicked",
  whopRedirectStarted: "whop_redirect_started",
} as const;

type WhopEvent = (typeof WHOP_EVENTS)[keyof typeof WHOP_EVENTS];

type WhopProperties = Record<string, string | number | boolean | undefined>;

export function trackWhopEvent(event: WhopEvent, properties: WhopProperties = {}) {
  try {
    window.whop?.track?.(event, {
      ...properties,
      page: window.location.pathname,
    });
  } catch {
    // Analytics must never interrupt the visitor's next action.
  }
}
