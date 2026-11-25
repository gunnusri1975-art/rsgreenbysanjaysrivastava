import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { OVERVIEW_IMAGES, OVERVIEW_METRICS } from '../data/propertyData';

const OVERVIEW_POINTS = [
  'Residential plots available in multiple sizes from 50 to 1,200 square yards',
  'Wide RCC roads planned in 40 ft, 30 ft, 25 ft, and 22 ft widths',
  'Gated community enclosed by a perimeter boundary wall with security guard',
  'Electricity, water supply, sewer, drainage, park, and inside-society school, hospital & water park',
] as const;

export function PropertyOverview() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [maxSqYd, setMaxSqYd] = useState(1200);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let frameId = 0;
    let triggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !triggered) {
          triggered = true;
          const start = performance.now();
          const duration = 900;
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setMaxSqYd(Math.round(50 + (1200 - 50) * eased));
            if (progress < 1) {
              frameId = requestAnimationFrame(animate);
            }
          };
          frameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Clean Architectural Photo Grid (1 Wide Feature + 1 4:3 Detail + Highlight Card) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="anim-slide-left card-lift rounded-xl overflow-hidden border border-ivory-border shadow-card bg-white">
              <div className="aspect-[16/10] w-full overflow-hidden bg-ivory-warm">
                <img
                  src={OVERVIEW_IMAGES.primary.src}
                  alt={OVERVIEW_IMAGES.primary.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>
              <div className="px-4 py-2.5 bg-white border-t border-ivory-border flex items-center justify-between text-xs">
                <span className="font-semibold text-forest-deep">Wide RCC &amp; Paved Roads</span>
                <span className="text-charcoal-muted">40 ft, 30 ft, 25 ft &amp; 22 ft Widths</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-stretch">
              <div className="anim-slide-left card-lift rounded-xl overflow-hidden border border-ivory-border shadow-card bg-ivory-warm">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={OVERVIEW_IMAGES.secondary.src}
                    alt={OVERVIEW_IMAGES.secondary.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              <div className="anim-slide-left card-lift rounded-xl overflow-hidden border border-ivory-border shadow-card bg-ivory-warm">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={OVERVIEW_IMAGES.tertiary.src}
                    alt={OVERVIEW_IMAGES.tertiary.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Overview Copy */}
          <div className="lg:col-span-6 anim-slide-right">
            <span className="block text-xs font-semibold uppercase tracking-widest text-gold-dark">
              Property Overview
            </span>
            <h2 className="mt-2 font-display font-bold tracking-tight text-forest-deep text-3xl sm:text-4xl leading-tight">
              Discover Your Future Home
            </h2>

            <p className="mt-4 text-base text-charcoal-muted leading-relaxed">
              <strong className="font-semibold text-charcoal">RS GREEN CITY</strong> is a
              residential plotted development located on the{' '}
              <strong className="font-semibold text-charcoal">
                Naubasta–Hamirpur Highway, Kanpur
              </strong>
              . Planned around wide internal roads, essential civic utilities, and green open
              spaces, the project offers residential plots in varied sizes ranging from{' '}
              <strong className="font-semibold text-charcoal">50 to 1,200 square yards</strong>.
            </p>

            <ul className="mt-6 space-y-3">
              {OVERVIEW_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-charcoal">
                  <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#layout-map"
                className="btn-clean inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-forest-deep hover:bg-forest text-white text-sm font-semibold"
              >
                <span>View Site Layout Map</span>
              </a>
              <a
                href="#gallery"
                className="btn-clean inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-ivory-warm hover:bg-ivory-cream border border-ivory-border text-forest-deep text-sm font-semibold"
              >
                <span>Explore Site Photos</span>
              </a>
            </div>
          </div>
        </div>

        {/* Distinct Sapphire-Slate & Warm-Brass Key Facts Strip */}
        <div
          ref={metricsRef}
          className="anim-fade-up card-lift mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-white/15 bg-[#0B2642] text-white shadow-elevated"
        >
          {OVERVIEW_METRICS.map((metric, idx) => (
            <div key={metric.label} className="p-5 sm:p-6">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#D7B983]">
                {metric.label}
              </span>
              <span className="block mt-1 font-display font-bold text-base sm:text-lg text-white tabular-nums">
                {idx === 0 ? `50 – ${maxSqYd.toLocaleString('en-IN')} Sq. Yards` : metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
