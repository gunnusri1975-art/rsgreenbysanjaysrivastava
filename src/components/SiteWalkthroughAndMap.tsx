import { useEffect, useRef, useState } from 'react';
import { Expand, FileDown, Film, Maximize2, Minimize2, Pause, Play, X } from 'lucide-react';
import {
  LAYOUT_PLANS,
  SITE_VIDEOS,
  type LayoutPlanItem,
  type SiteVideoItem,
} from '../data/propertyData';

function formatVideoTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function SilentVideoPlayer({ video }: { video: SiteVideoItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const lockMute = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.volume = 0;
  };

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [video.id]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    lockMute(el);
    if (el.paused || el.ended) {
      void el.play();
    } else {
      el.pause();
    }
  };

  const handleSeek = (nextTime: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;
    try {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
      } else if (container.requestFullscreen) {
        await container.requestFullscreen();
      }
    } catch {
      // Ignore fullscreen rejection if blocked by browser policy.
    }
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className="relative group card-lift rounded-xl overflow-hidden bg-black border border-[#CBD8E6] shadow-elevated select-none"
    >
      <video
        ref={videoRef}
        key={video.id}
        src={video.src}
        poster={video.poster}
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        onClick={togglePlay}
        onLoadedMetadata={(e) => {
          lockMute(e.currentTarget);
          setDuration(e.currentTarget.duration || 0);
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={(e) => {
          lockMute(e.currentTarget);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onVolumeChange={(e) => {
          if (!e.currentTarget.muted || e.currentTarget.volume !== 0) {
            lockMute(e.currentTarget);
          }
        }}
        className={`w-full bg-black cursor-pointer ${
          isFullscreen ? 'h-full object-contain' : 'aspect-video object-contain'
        }`}
      >
        Your browser does not support HTML5 video playback.
      </video>

      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`Play ${video.tabLabel}`}
          className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0A2942]/85 hover:bg-[#0A2942] text-white border border-white/30 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        >
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5 text-gold-soft" />
        </button>
      )}

      {/* Custom Player Controls — Play/Pause, Seek & Fullscreen Only (No Volume Button) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-3 sm:px-4 pt-6 pb-2.5 flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="p-1.5 rounded-md bg-white/15 hover:bg-white/25 text-white transition-colors shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
        </button>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          aria-label="Seek video progress"
          onChange={(e) => handleSeek(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #D7B983 ${progressPercent}%, rgba(255,255,255,0.28) ${progressPercent}%)`,
          }}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#D7B983]"
        />

        <span className="text-[11px] sm:text-xs font-medium text-white/90 tabular-nums shrink-0">
          {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
        </span>

        <button
          type="button"
          onClick={() => void toggleFullscreen()}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen video'}
          className="p-1.5 rounded-md bg-white/15 hover:bg-white/25 text-white transition-colors shrink-0"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export function SiteWalkthroughAndMap() {
  const [activeVideoId, setActiveVideoId] = useState<SiteVideoItem['id']>('shambhua-entrance');
  const [activePlanId, setActivePlanId] = useState<LayoutPlanItem['id']>('master');
  const [zoomOpen, setZoomOpen] = useState(false);

  const activeVideo =
    SITE_VIDEOS.find((video) => video.id === activeVideoId) ?? SITE_VIDEOS[0];
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
      {/* 1. Cool Slate-Sky Video Section — Clean Switcher Across Shambhua & Bidhnu Videos */}
      <section id="walkthrough" className="py-16 sm:py-24 bg-[#ECF2F7] border-y border-[#D6E1EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-[#D6E1EC]">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#125282]">
                <Film className="w-3.5 h-3.5" />
                <span>Site Video Proof · Shambhua &amp; Bidhnu</span>
              </span>
              <h2 className="mt-2 font-display font-bold tracking-tight text-[#0A2942] text-3xl sm:text-4xl leading-tight">
                Real Site Walkthrough Videos
              </h2>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose site video">
              {SITE_VIDEOS.map((video) => {
                const isActive = video.id === activeVideo.id;
                return (
                  <button
                    key={video.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveVideoId(video.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0A2942] text-white shadow-sm'
                        : 'bg-white text-[#0A2942] border border-[#CBD8E6] hover:border-[#0A2942]/40 hover:bg-white/90'
                    }`}
                  >
                    <span>{video.tabLabel}</span>
                    <span
                      className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/15 text-gold-soft' : 'bg-[#ECF2F7] text-[#125282]'
                      }`}
                    >
                      {video.durationLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 min-w-0 anim-slide-left">
              <SilentVideoPlayer video={activeVideo} />
              <p className="mt-3 text-xs text-charcoal-muted flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                <span>{activeVideo.caption}</span>
              </p>
            </div>

            <div className="lg:col-span-5 min-w-0 anim-slide-right">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#125282]">
                {activeVideo.siteTag}
              </span>
              <h3 className="mt-2 font-display font-bold tracking-tight text-[#0A2942] text-2xl sm:text-3xl leading-tight">
                {activeVideo.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
                {activeVideo.description}
              </p>

              <div className="mt-6 space-y-3">
                {activeVideo.chapters.map((chapter) => (
                  <div
                    key={chapter.time}
                    className="card-lift p-4 rounded-lg bg-white border border-[#D6E1EC] shadow-sm"
                  >
                    <span className="text-xs font-bold text-[#125282]">{chapter.time}</span>
                    <h4 className="mt-0.5 text-sm font-bold text-charcoal">{chapter.title}</h4>
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
