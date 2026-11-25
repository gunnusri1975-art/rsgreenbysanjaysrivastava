import { useEffect, useRef, useState } from 'react';
import { Phone, X } from 'lucide-react';
import {
  CONTACT_NUMBERS,
  SITE_BRAND,
  trackOptionalMetaContact,
} from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

type MobileSheetMode = 'whatsapp' | 'call' | null;

export function FloatingWhatsApp() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileSheet, setMobileSheet] = useState<MobileSheetMode>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopOpen(false);
        setMobileSheet(null);
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        desktopContainerRef.current &&
        !desktopContainerRef.current.contains(event.target as Node)
      ) {
        setDesktopOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* Desktop Bottom-Right Floating WhatsApp Button + Chooser */}
      <div
        ref={desktopContainerRef}
        className="hidden md:flex flex-col items-end fixed bottom-6 right-6 z-40"
      >
        {desktopOpen && (
          <div
            role="dialog"
            aria-label="Choose WhatsApp contact number"
            className="animate-modal-up mb-3 w-72 rounded-xl bg-white border border-ivory-border shadow-elevated overflow-hidden"
          >
            <div className="bg-forest-deep text-white px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-soft">
                  {SITE_BRAND.name}
                </p>
                <p className="text-sm font-bold">{SITE_BRAND.advisorName} — WhatsApp</p>
              </div>
              <button
                type="button"
                onClick={() => setDesktopOpen(false)}
                aria-label="Close WhatsApp options"
                className="p-1 rounded hover:bg-white/15 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 space-y-2 bg-ivory-warm">
              {CONTACT_NUMBERS.map((contact) => (
                <a
                  key={contact.id}
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackOptionalMetaContact('whatsapp', contact.display);
                    setDesktopOpen(false);
                  }}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white hover:bg-leaf-mist border border-ivory-border transition-colors"
                >
                  <div>
                    <span className="block text-[11px] font-medium text-charcoal-muted">
                      {contact.label}
                    </span>
                    <span className="block text-sm font-bold text-forest-deep">
                      {contact.display}
                    </span>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-leaf text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setDesktopOpen((prev) => !prev)}
          aria-expanded={desktopOpen}
          aria-label="Open WhatsApp contact options"
          className="btn-clean w-14 h-14 rounded-full bg-leaf hover:bg-forest-deep text-white shadow-elevated flex items-center justify-center border border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          {desktopOpen ? <X className="w-6 h-6" /> : <WhatsAppIcon className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Compact Sticky Bottom Contact Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40">
        {mobileSheet && (
          <div
            role="dialog"
            aria-label={
              mobileSheet === 'whatsapp'
                ? 'Select WhatsApp number'
                : 'Select phone number'
            }
            className="animate-modal-up mx-3 mb-2 rounded-xl bg-white border border-ivory-border shadow-elevated overflow-hidden"
          >
            <div className="px-4 py-2.5 bg-forest-deep text-white flex items-center justify-between">
              <span className="text-xs font-semibold">
                {mobileSheet === 'whatsapp'
                  ? `WhatsApp ${SITE_BRAND.advisorName}`
                  : `Call ${SITE_BRAND.advisorName}`}
              </span>
              <button
                type="button"
                onClick={() => setMobileSheet(null)}
                aria-label="Close selector"
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2.5 grid grid-cols-1 gap-2 bg-ivory-warm">
              {CONTACT_NUMBERS.map((contact) => {
                const isWhatsApp = mobileSheet === 'whatsapp';
                return (
                  <a
                    key={contact.id}
                    href={isWhatsApp ? contact.whatsappUrl : contact.telUrl}
                    target={isWhatsApp ? '_blank' : undefined}
                    rel={isWhatsApp ? 'noopener noreferrer' : undefined}
                    onClick={() => {
                      trackOptionalMetaContact(
                        isWhatsApp ? 'whatsapp' : 'call',
                        contact.display,
                      );
                      setMobileSheet(null);
                    }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white border border-ivory-border"
                  >
                    <div>
                      <span className="block text-[11px] font-medium text-charcoal-muted">
                        {contact.label}
                      </span>
                      <span className="block text-sm font-bold text-forest-deep">
                        {contact.display}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                        isWhatsApp
                          ? 'bg-leaf text-white'
                          : 'bg-forest-deep text-white'
                      }`}
                    >
                      {isWhatsApp ? 'WhatsApp' : 'Call Now'}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white border-t border-ivory-border px-3 py-2.5 grid grid-cols-2 gap-2.5 shadow-elevated">
          <button
            type="button"
            onClick={() =>
              setMobileSheet((prev) => (prev === 'whatsapp' ? null : 'whatsapp'))
            }
            className="inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-leaf text-white text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileSheet((prev) => (prev === 'call' ? null : 'call'))}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-forest-deep text-white text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            <Phone className="w-4 h-4 shrink-0 text-gold-soft" />
            <span>Call Now</span>
          </button>
        </div>
      </div>
    </>
  );
}
