import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  PRIMARY_CONTACT,
  SITE_BRAND,
  trackOptionalMetaContact,
} from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import brandLogo from '../assets/images/rs-green-city-brand-logo.png';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Advisor', href: '#advisor' },
  { label: 'Video & Map', href: '#walkthrough' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 40);
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        backgroundColor: scrolled ? 'rgba(6, 26, 48, 0.95)' : 'rgba(6, 26, 48, 0.82)',
      }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 backdrop-blur-md border-b border-white/15 ${
        scrolled ? 'shadow-elevated' : ''
      }`}
    >
      {/* Frosted Blurred Header — Always Pinned & Visible at Top While Scrolling */}
      <nav
        aria-label="Primary Navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-3 sm:gap-4"
      >
        <a
          href="#home"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 sm:gap-3 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
        >
          <span className="h-10 sm:h-12 px-1.5 sm:px-2 py-1 rounded-lg bg-white border border-white/80 flex items-center justify-center shrink-0 shadow-sm">
            <img
              src={brandLogo}
              alt={`${SITE_BRAND.name} Logo`}
              className="h-full w-auto object-contain"
            />
          </span>
          <div className="leading-tight min-w-0">
            <span className="block font-display font-extrabold tracking-tight text-white text-sm sm:text-lg whitespace-nowrap">
              {SITE_BRAND.name}
            </span>
            <span className="block text-[11px] font-medium text-white/85 whitespace-nowrap">
              {SITE_BRAND.advisorRole}:{' '}
              <strong className="font-semibold text-gold-soft">{SITE_BRAND.advisorName}</strong>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/85 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop WhatsApp CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={PRIMARY_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOptionalMetaContact('whatsapp', PRIMARY_CONTACT.display)}
            className="btn-clean hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-leaf hover:bg-leaf-soft text-white text-xs sm:text-sm font-semibold border border-white/20"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0 text-gold-soft" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 rounded-lg border border-white/25 text-white hover:bg-white/15 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Hairline Scroll Progress */}
      <div className="h-[2px] w-full bg-white/10 overflow-hidden">
        <div
          aria-hidden="true"
          className="h-full bg-gold-soft origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Minimal Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          style={{ backgroundColor: 'rgba(6, 26, 48, 0.97)' }}
          className="lg:hidden animate-drawer-down backdrop-blur-xl border-t border-white/15 shadow-elevated px-4 pt-3 pb-5"
        >
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="px-3.5 py-3 rounded-lg text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
