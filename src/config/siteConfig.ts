export interface ContactNumber {
  id: 'primary' | 'secondary';
  label: string;
  display: string;
  raw: string;
  telUrl: string;
  whatsappUrl: string;
}

export const SITE_BRAND = {
  name: 'RS GREEN CITY',
  tagline: 'Residential Plots',
  locationShort: 'Naubasta–Hamirpur Highway, Kanpur',
  locationFull: 'Naubasta–Hamirpur Highway, Kanpur, Uttar Pradesh, India',
  advisorName: 'Sanjay Srivastava',
  advisorRole: 'Senior Advisor',
} as const;

export const WHATSAPP_PREFILL_MESSAGE =
  'Hello Sanjay Ji, I visited your RS GREEN CITY website and I am interested in residential plots. Please share more details about plot sizes and availability.';

/**
 * GOOGLE MAPS CONFIGURATION
 * -------------------------
 * Uses the exact Google Maps pin link provided for RS GREEN CITY.
 */
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/eRQUcH6KAVgsRR3FA';

export const GOOGLE_DIRECTIONS_URL = 'https://maps.app.goo.gl/eRQUcH6KAVgsRR3FA';

export const GOOGLE_MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Shambhua%20Hamirpur%20Road,%20Kanpur,%20Uttar%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed';

export function buildWhatsAppUrl(rawPhone: string, message = WHATSAPP_PREFILL_MESSAGE): string {
  const digits = rawPhone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const CONTACT_NUMBERS: readonly ContactNumber[] = [
  {
    id: 'primary',
    label: 'Primary Line',
    display: '+91 70077 25655',
    raw: '917007725655',
    telUrl: 'tel:+917007725655',
    whatsappUrl: buildWhatsAppUrl('917007725655'),
  },
  {
    id: 'secondary',
    label: 'Secondary Line',
    display: '+91 94526 02394',
    raw: '919452602394',
    telUrl: 'tel:+919452602394',
    whatsappUrl: buildWhatsAppUrl('919452602394'),
  },
];

export const PRIMARY_CONTACT = CONTACT_NUMBERS[0];
export const SECONDARY_CONTACT = CONTACT_NUMBERS[1];

const AD_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
] as const;

const AD_ATTRIBUTION_STORAGE_KEY = 'rs_green_city_ad_attribution';

export type AdAttribution = Partial<Record<(typeof AD_PARAM_KEYS)[number], string>>;

/**
 * Preserves Meta Ads & UTM query parameters in sessionStorage across in-page navigation
 * without sending data to any external analytics endpoint.
 */
export function captureAdAttribution(): AdAttribution {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const captured: AdAttribution = {};

  for (const key of AD_PARAM_KEYS) {
    const value = params.get(key);
    if (value) {
      captured[key] = value;
    }
  }

  if (Object.keys(captured).length > 0) {
    try {
      window.sessionStorage.setItem(AD_ATTRIBUTION_STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // Ignore storage quota or private-mode restrictions
    }
    return captured;
  }

  return getStoredAdAttribution();
}

export function getStoredAdAttribution(): AdAttribution {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(AD_ATTRIBUTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdAttribution) : {};
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Optional helper for Meta Pixel Lead/Contact events.
 * Only fires if the website owner has explicitly configured window.fbq in index.html.
 */
export function trackOptionalMetaContact(channel: 'whatsapp' | 'call', contactLabel: string): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', {
      content_name: SITE_BRAND.name,
      contact_channel: channel,
      contact_line: contactLabel,
    });
  }
}
