import { MapPin } from 'lucide-react';
import {
  CONTACT_NUMBERS,
  GOOGLE_MAPS_URL,
  SITE_BRAND,
  trackOptionalMetaContact,
} from '../config/siteConfig';

const FOOTER_NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Advisor', href: '#advisor' },
  { label: 'Video & Map', href: '#walkthrough' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#06182B] text-white pt-10 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <h2 className="font-display font-extrabold text-lg tracking-tight text-white">
              {SITE_BRAND.name}
            </h2>
            <div className="mt-1.5 flex items-center gap-2 text-xs sm:text-sm text-white/75">
              <MapPin className="w-3.5 h-3.5 text-[#D7B983] shrink-0" />
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {SITE_BRAND.tagline} · {SITE_BRAND.locationShort}
              </a>
            </div>
          </div>

          {/* Compact Single-Row Navigation */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs sm:text-sm text-white/75 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/65">
          <p>
            &copy; {year} {SITE_BRAND.name} · {SITE_BRAND.advisorRole}:{' '}
            <span className="text-white/90 font-medium">{SITE_BRAND.advisorName}</span>
          </p>

          {/* Ultra-Minimal Inline Contact Line (Zero Card Repetition) */}
          <div className="flex flex-wrap items-center gap-4">
            {CONTACT_NUMBERS.map((contact) => (
              <span key={contact.id} className="inline-flex items-center gap-2">
                <a
                  href={contact.telUrl}
                  onClick={() => trackOptionalMetaContact('call', contact.display)}
                  className="text-white/85 hover:text-white font-medium"
                >
                  {contact.display}
                </a>
                <span className="text-white/30">·</span>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOptionalMetaContact('whatsapp', contact.display)}
                  className="text-[#D7B983] hover:text-white"
                >
                  WhatsApp
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
