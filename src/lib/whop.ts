export const WHOP_EVENTS = {
  leadSubmitted: "Lead",
  freeCheckout: "Checkout - Free Community",
  paidCheckout: "Checkout - Social Capital",
  videoClicked: "YouTube Video Click",
  youtubeSubscribeClicked: "YouTube Subscription Click",
  whopRedirectStarted: "Redirected to Whop",
  basedBotSponsorViewed: "BasedBot Sponsor",
  fomoSponsorViewed: "Fomo Sponsor",
} as const;

type WhopEvent = (typeof WHOP_EVENTS)[keyof typeof WHOP_EVENTS];

type WhopProperties = Record<string, string | number | boolean | undefined>;

type WhopContext = {
  country?: string;
};

declare global {
  interface Window {
    whop?: {
      track?: (event: string, data: Record<string, unknown>) => void;
    };
    __whopContext?: WhopContext;
  }
}

function getTrackingContext(): WhopProperties {
  const url = new URL(window.location.href);
  const referrer = document.referrer
    ? new URL(document.referrer).hostname
    : "direct";

  return {
    country: window.__whopContext?.country,
    language: navigator.language,
    locale: document.documentElement.lang,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer,
    utm_source: url.searchParams.get("utm_source") ?? undefined,
    utm_medium: url.searchParams.get("utm_medium") ?? undefined,
    utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
  };
}

export function trackWhopEvent(
  event: WhopEvent,
  properties: WhopProperties = {},
) {
  try {
    window.whop?.track?.(event, {
      ...getTrackingContext(),
      ...properties,
      page: window.location.pathname,
    });
  } catch {
    // Analytics must never interrupt the visitor's next action.
  }
}
