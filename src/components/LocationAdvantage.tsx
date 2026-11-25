import { Check, ExternalLink, MapPin, Navigation } from 'lucide-react';
import {
  GOOGLE_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
  SITE_BRAND,
} from '../config/siteConfig';

const NEARBY_FACILITIES = [
  'Inter College',
  'Degree College',
  'Academic College',
  'Hospital',
  'Ring Road',
  'Express Highway',
  'Defence Corridor',
  'Leather Cluster',
  'Local Market',
] as const;

export function LocationAdvantage() {
  return (
    <section
      id="location"
      className="py-16 sm:py-24 bg-[#F5F0E6] border-y border-[#E6DEC9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Located in New Greater Kanpur + Nearby Connectivity */}
          <div className="lg:col-span-5 min-w-0 anim-slide-left">
            <span className="block text-xs font-semibold uppercase tracking-widest text-[#8C6D3F]">
              Located in New Greater Kanpur
            </span>
            <h2 className="mt-2 font-display font-bold tracking-tight text-forest-deep text-3xl sm:text-4xl leading-tight">
              Location Advantage
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-charcoal">
              A promising location for your future home and investment.
            </p>

            <div className="mt-5 p-5 rounded-xl bg-white border border-[#DCE5DE] shadow-card">
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#E7F4EC] text-[#1E6B47] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-display font-bold text-lg text-forest-deep">
                    {SITE_BRAND.locationShort}
                  </p>
                  <p className="text-sm text-charcoal-muted">
                    Shambhua, New Greater Kanpur, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 p-5 rounded-xl bg-white border border-[#DCE5DE]">
              <h3 className="font-display font-bold text-sm sm:text-base text-forest-deep">
                Nearby Facilities &amp; Connectivity
              </h3>
              <ul className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {NEARBY_FACILITIES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal"
                  >
                    <Check className="w-4 h-4 text-[#1E6B47] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 pt-3 border-t border-ivory-border text-xs sm:text-sm font-bold text-[#8C6D3F]">
                A Growing Location. A Better Future.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clean inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#092848] hover:bg-[#0D3863] text-white text-sm font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-4 h-4 text-[#D7B983]" />
              </a>

              <a
                href={GOOGLE_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clean inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white hover:bg-[#EDF2F7] border border-[#DCE5DE] text-[#092848] text-sm font-semibold"
              >
                <Navigation className="w-4 h-4 text-[#125282]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right: Clean Embedded Google Map */}
          <div className="lg:col-span-7 min-w-0 anim-slide-right">
            <div className="card-lift rounded-xl overflow-hidden bg-white border border-[#E6DEC9] shadow-elevated">
              <div className="aspect-[4/3] sm:aspect-[16/10] w-full bg-ivory-cream">
                <iframe
                  title="RS GREEN CITY — Shambhua, Naubasta–Hamirpur Highway, Kanpur Map"
                  src={GOOGLE_MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <div className="px-5 py-3.5 bg-white border-t border-ivory-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-charcoal-muted">
                <span>Shambhua · Naubasta–Hamirpur Highway, Kanpur</span>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-forest-deep hover:underline shrink-0"
                >
                  Open exact site pin &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
