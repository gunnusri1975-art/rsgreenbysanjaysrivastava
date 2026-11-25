import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { captureAdAttribution } from './config/siteConfig';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LocationAdvantage } from './components/LocationAdvantage';
import { Navbar } from './components/Navbar';
import { PhotoGallery } from './components/PhotoGallery';
import { PropertyFeatures } from './components/PropertyFeatures';
import { PropertyOverview } from './components/PropertyOverview';
import { SeniorAdvisor } from './components/SeniorAdvisor';
import { SiteWalkthroughAndMap } from './components/SiteWalkthroughAndMap';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    captureAdAttribution();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Clean first-screen hero entrance
      gsap.from('.anim-hero-text', {
        y: 16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.from('.anim-hero-card', {
        y: 18,
        opacity: 0,
        duration: 0.65,
        delay: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      // 2. Smooth continuous scroll-linked depth on the blurred hero background
      const heroBg = document.querySelector('#home > img[aria-hidden="true"]');
      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { yPercent: -3 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: '#home',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      }

      // 3. Smooth heading glide across sections as you scroll
      gsap.utils.toArray<HTMLElement>('main section:not(#home) h2').forEach((heading) => {
        gsap.from(heading, {
          y: 16,
          opacity: 0.25,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: heading,
            start: 'top 92%',
            once: true,
          },
        });
      });

      // 4. Silky-smooth vertical settle for cards and content blocks (zero tilt or sideways jumps)
      const boxSelectors =
        '.anim-slide-left, .anim-slide-right, .anim-scale-in, .anim-fade-up, .anim-gallery-tile';

      ScrollTrigger.batch(boxSelectors, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            y: 20,
            opacity: 0.4,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });
        },
      });

      // 5. Gentle continuous scroll-scrub depth on overview & gallery frames
      gsap.utils.toArray<HTMLElement>('#about img, #gallery button img').forEach((img) => {
        gsap.fromTo(
          img,
          { y: 6 },
          {
            y: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        );
      });
    }, rootRef);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-white text-charcoal">
      <Navbar />

      <main className="overflow-x-clip">
        <Hero />
        <PropertyOverview />
        <PropertyFeatures />
        <SeniorAdvisor />
        <SiteWalkthroughAndMap />
        <PhotoGallery />
        <LocationAdvantage />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
