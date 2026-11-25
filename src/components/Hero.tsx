import { ArrowRight, MapPin, Play } from 'lucide-react';
import {
  PRIMARY_CONTACT,
  SITE_BRAND,
  trackOptionalMetaContact,
} from '../config/siteConfig';
import { ADVISOR_IMAGE, HERO_IMAGE, OVERVIEW_IMAGES } from '../data/propertyData';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-ivory-border bg-[#061A30]"
    >
      {/* Blurred Site Photograph Directly at the Top Behind RS GREEN CITY */}
      <img
        src={OVERVIEW_IMAGES.primary.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-[8px] opacity-45 pointer-events-none select-none"
      />
      {/* Rich Fresh Dark-Blue Atmospheric Scrim for Razor-Sharp Text Readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#061A30]/95 via-[#092848]/88 to-[#0E3C68]/72 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: RS GREEN CITY + Clean Advisor Attribution + CTAs */}
          <div className="lg:col-span-6 min-w-0 text-white">
            <div className="anim-hero-text inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gold-soft tracking-wide">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{SITE_BRAND.locationShort}</span>
            </div>

            <h1 className="anim-hero-text mt-3 font-display font-extrabold tracking-tight text-white text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.06]">
              {SITE_BRAND.name}
            </h1>

            <p className="anim-hero-text mt-3.5 text-lg sm:text-xl font-semibold text-white leading-snug max-w-xl">
              Premium Residential Plots on Naubasta–Hamirpur Highway, Kanpur
            </p>

            <p className="anim-hero-text mt-3 text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
              Discover residential plots in a well-planned gated community with wide roads,
              essential infrastructure and green surroundings.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="anim-hero-text mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a
                href="#about"
                className="btn-clean inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-ivory-cream text-[#061A30] text-sm sm:text-base font-bold shadow-sm"
              >
                <span>Explore Property</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PRIMARY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOptionalMetaContact('whatsapp', PRIMARY_CONTACT.display)}
                className="btn-clean inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-leaf hover:bg-leaf-soft text-white text-sm sm:text-base font-semibold shadow-sm"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>

            {/* Larger, Balanced Senior Advisor Attribution */}
            <div className="anim-hero-text mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-lg">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold-soft/85 bg-white/10 shrink-0 shadow-md">
                  <img
                    src={ADVISOR_IMAGE.src}
                    alt={ADVISOR_IMAGE.alt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-soft">
                    {SITE_BRAND.advisorRole}
                  </span>
                  <span className="block font-display font-extrabold text-xl sm:text-2xl text-white">
                    {SITE_BRAND.advisorName}
                  </span>
                </div>
              </div>

              <a
                href="#advisor"
                className="self-start sm:self-auto shrink-0 text-xs sm:text-sm font-semibold text-white hover:text-gold-soft transition-colors px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25"
              >
                Meet Advisor &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Sharp Main Site Photograph & Crisp Architectural Metrics */}
          <div className="lg:col-span-6 min-w-0 anim-hero-card">
            <div className="card-lift rounded-xl overflow-hidden bg-white shadow-elevated">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-100">
                <img
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center"
                />
                <a
                  href="#walkthrough"
                  className="btn-clean absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#061A30]/90 hover:bg-[#061A30] text-white text-xs font-semibold backdrop-blur-sm border border-white/15"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-gold-soft" />
                  <span>Watch Highway-to-Site Video</span>
                </a>
              </div>

              <div className="grid grid-cols-3 divide-x divide-ivory-border bg-white px-2 py-4 text-center">
                <div className="px-2">
                  <span className="block text-[11px] sm:text-xs text-charcoal-muted font-medium">
                    Plot Sizes
                  </span>
                  <span className="block mt-0.5 text-xs sm:text-sm font-bold text-[#092848]">
                    50 – 1,200 Sq. Yds
                  </span>
                </div>
                <div className="px-2">
                  <span className="block text-[11px] sm:text-xs text-charcoal-muted font-medium">
                    RCC Roads
                  </span>
                  <span className="block mt-0.5 text-xs sm:text-sm font-bold text-[#092848]">
                    40, 30, 25 &amp; 22 ft
                  </span>
                </div>
                <div className="px-2">
                  <span className="block text-[11px] sm:text-xs text-charcoal-muted font-medium">
                    Layout
                  </span>
                  <span className="block mt-0.5 text-xs sm:text-sm font-bold text-[#092848]">
                    Gated Community
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
