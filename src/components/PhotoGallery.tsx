import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/propertyData';

export function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length,
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const activeItem = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="max-w-2xl">
            <span className="block text-xs font-semibold uppercase tracking-widest text-gold-dark">
              Site Photographs
            </span>
            <h2 className="mt-2 font-display font-bold tracking-tight text-forest-deep text-3xl sm:text-4xl leading-tight">
              Explore RS GREEN CITY
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Real on-site photographs of the wide RCC roads, interlocking paved lanes, boundary
              wall, water supply infrastructure, and green surroundings.
            </p>
          </div>
          <span className="text-xs font-medium text-charcoal-muted">
            Click any photo to enlarge
          </span>
        </div>

        {/* Clean 4:3 Editorial Photo Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="anim-gallery-tile card-lift group text-left rounded-xl overflow-hidden bg-[#FAF8F3] border border-ivory-border shadow-card hover:border-forest/35 hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory-warm">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/95 text-forest-deep flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Expand className="w-4 h-4" />
                </span>
              </div>
              <div className="p-3.5 border-t border-ivory-border">
                <span className="block text-[11px] font-bold text-gold-dark uppercase tracking-wide">
                  {item.category}
                </span>
                <p className="mt-1 text-xs sm:text-sm font-medium text-charcoal line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox */}
      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="flex items-center justify-between text-white max-w-6xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-soft">
                {activeItem.category} · {activeIndex + 1} / {GALLERY_ITEMS.length}
              </span>
              <p className="text-sm sm:text-base font-medium text-white mt-0.5">
                {activeItem.caption}
              </p>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image preview"
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-1 sm:left-3 z-10 p-2.5 sm:p-3 rounded-lg bg-black/65 hover:bg-forest text-white border border-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <img
              key={activeItem.id}
              src={activeItem.src}
              alt={activeItem.alt}
              className="animate-modal-up max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-lg"
            />

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-1 sm:right-3 z-10 p-2.5 sm:p-3 rounded-lg bg-black/65 hover:bg-forest text-white border border-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div
            className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-4xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {GALLERY_ITEMS.map((thumb, idx) => (
              <button
                key={thumb.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View ${thumb.category}`}
                className={`w-14 h-10 rounded-md overflow-hidden border-2 shrink-0 transition-all ${
                  idx === activeIndex
                    ? 'border-gold-soft opacity-100'
                    : 'border-transparent opacity-55 hover:opacity-90'
                }`}
              >
                <img src={thumb.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
