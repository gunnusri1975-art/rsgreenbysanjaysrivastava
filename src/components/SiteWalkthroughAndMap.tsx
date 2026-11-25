import { useEffect, useState } from 'react';
import { Expand, FileDown, Play, X } from 'lucide-react';
import { LAYOUT_PLANS, SITE_VIDEO, type LayoutPlanItem } from '../data/propertyData';

export function SiteWalkthroughAndMap() {
  const [activePlanId, setActivePlanId] = useState<LayoutPlanItem['id']>('master');
  const [zoomOpen, setZoomOpen] = useState(false);

  const activePlan =
    LAYOUT_PLANS.find((plan) => plan.id === activePlanId) ?? LAYOUT_PLANS[0];

  useEffect(() => {
    if (!zoomOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [zoomOpen]);

  return (
    <>
      {/* 1. Cool Slate-Sky Video Section — Clean, No Blurred Background Image */}
      <section id="walkthrough" className="py-16 sm:py-24 bg-[#ECF2F7] border-y border-[#D6E1EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 min-w-0 anim-slide-left">
              <div className="card-lift rounded-xl overflow-hidden bg-black border border-[#CBD8E6] shadow-elevated">
                <video
                  src={SITE_VIDEO.src}
                  poster={SITE_VIDEO.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video bg-black"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>
              <p className="mt-3 text-xs text-charcoal-muted flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                <span>
                  Unedited site walkthrough ({SITE_VIDEO.durationLabel}) — tap play to watch the
                  direct turn-off from Naubasta–Hamirpur Highway.
                </span>
              </p>
            </div>

            <div className="lg:col-span-5 min-w-0 anim-slide-right">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#125282]">
                Site Video Proof
              </span>
              <h2 className="mt-2 font-display font-bold tracking-tight text-[#0A2942] text-3xl sm:text-4xl leading-tight">
                Highway Approach &amp; Site Walkthrough
              </h2>
              <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
                See the real drive directly off the Naubasta–Hamirpur Highway onto the project
                approach road, through the entrance gate, and across the internal RCC roads.
              </p>

              <div className="mt-6 space-y-3">
                {SITE_VIDEO.chapters.map((chapter) => (
                  <div
                    key={chapter.time}
                    className="card-lift p-4 rounded-lg bg-white border border-[#D6E1EC] shadow-sm"
                  >
                    <span className="text-xs font-bold text-[#125282]">{chapter.time}</span>
                    <h3 className="mt-0.5 text-sm font-bold text-charcoal">{chapter.title}</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-charcoal-muted">
                      {chapter.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Deep Pine Architectural Blueprint Showcase — All 5 Site Layout Maps */}
      <section id="layout-map" className="py-16 sm:py-24 bg-[#162C22] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="max-w-xl">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#D7B983]">
                Master &amp; Block Plans
              </span>
              <h2 className="mt-2 font-display font-bold tracking-tight text-white text-3xl sm:text-4xl leading-tight">
                Site Layout Maps
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-white/75 leading-relaxed">
                Switch between all block and phase layout plans to inspect road widths, park zones,
                highway frontage, and plot dimensions. Click any map to zoom in.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {LAYOUT_PLANS.map((plan) => {
                const isActive = plan.id === activePlanId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setActivePlanId(plan.id)}
                    className={`px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-[#162C22] shadow-sm'
                        : 'bg-white/10 text-white/85 border border-white/15 hover:bg-white/20'
                    }`}
                  >
                    {plan.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="anim-fade-up mt-8 rounded-xl bg-white text-charcoal shadow-elevated overflow-hidden">
            <div className="p-4 sm:p-5 bg-white border-b border-ivory-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-forest-deep">
                  {activePlan.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted">{activePlan.subtitle}</p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ivory-warm hover:bg-ivory-cream border border-ivory-border text-xs sm:text-sm font-semibold text-forest-deep transition-colors"
                >
                  <Expand className="w-4 h-4 text-forest" />
                  <span>Zoom Plan</span>
                </button>

                {activePlan.pdfHref && (
                  <a
                    href={activePlan.pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#162C22] hover:bg-forest text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <FileDown className="w-4 h-4 text-[#D7B983]" />
                    <span>Open PDF</span>
                  </a>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label={`Zoom ${activePlan.title}`}
              className="block w-full bg-white p-3 sm:p-6 cursor-zoom-in focus:outline-none"
            >
              <img
                key={activePlan.id}
                src={activePlan.imageSrc}
                alt={activePlan.alt}
                loading="lazy"
                className="animate-modal-up w-full max-h-[620px] object-contain mx-auto"
              />
            </button>

            <div className="px-4 sm:px-6 py-3 bg-[#F7F8F6] border-t border-ivory-border text-xs text-charcoal-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Click anywhere on the layout image to inspect plot numbers and road widths.</span>
              <a
                href="#contact"
                className="font-semibold text-forest-deep hover:underline shrink-0"
              >
                Check availability &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Zoom Lightbox for Layout Plan */}
      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePlan.title}
          onClick={() => setZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 p-3 sm:p-6 flex flex-col"
        >
          <div
            className="flex items-center justify-between text-white pb-3 max-w-7xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base">{activePlan.title}</h3>
              <p className="text-xs text-white/75">{activePlan.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {activePlan.pdfHref && (
                <a
                  href={activePlan.pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-forest-deep text-xs font-bold"
                >
                  <FileDown className="w-4 h-4" />
                  <span>PDF</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="Close zoomed layout plan"
                className="p-2 rounded-lg bg-white/15 hover:bg-white/25"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="animate-modal-up flex-1 overflow-auto flex items-center justify-center bg-white rounded-lg p-2 sm:p-4 max-w-7xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePlan.imageSrc}
              alt={activePlan.alt}
              className="max-w-none w-full lg:w-auto lg:max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
