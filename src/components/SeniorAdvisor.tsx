import { useEffect, useState } from 'react';
import { CalendarDays, Phone } from 'lucide-react';
import {
  PRIMARY_CONTACT,
  SITE_BRAND,
  trackOptionalMetaContact,
} from '../config/siteConfig';
import { ADVISOR_IMAGE } from '../data/propertyData';
import { WhatsAppIcon } from './WhatsAppIcon';

const VISIT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export function SeniorAdvisor() {
  const [activeDayIdx, setActiveDayIdx] = useState(5);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveDayIdx((prev) => (prev + 1) % VISIT_DAYS.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="advisor" className="py-16 sm:py-24 bg-[#FAF7F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="anim-scale-in card-lift rounded-xl bg-[#132920] text-white border border-[#244A3A] p-6 sm:p-10 shadow-elevated">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Clean Portrait Framing */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-52 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden bg-white border-2 border-[#C9A66B]/70 shadow-card">
                <img
                  src={ADVISOR_IMAGE.src}
                  alt={ADVISOR_IMAGE.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Advisor Information & Single Clean Action Pair */}
            <div className="md:col-span-8">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#D7B983]">
                Senior Advisor
              </span>
              <h2 className="mt-2 font-display font-bold tracking-tight text-white text-3xl sm:text-4xl leading-tight">
                Meet Your Senior Advisor
              </h2>

              <div className="mt-4 pb-4 border-b border-white/15">
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {SITE_BRAND.advisorName}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-[#D7B983]">
                  {SITE_BRAND.advisorRole} · {SITE_BRAND.name}
                </p>
              </div>

              <p className="mt-4 text-base text-white/80 leading-relaxed">
                Connect with our Senior Advisor for property details, plot availability and further
                information about RS GREEN CITY.
              </p>

              {/* Subtle 7-Day Site Visit Availability Calendar Strip */}
              <div className="mt-5 p-3.5 rounded-lg bg-white/10 border border-white/15">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                    <CalendarDays className="w-3.5 h-3.5 text-[#D7B983]" />
                    <span>Site Visits Available Daily</span>
                  </span>
                  <span className="text-[11px] font-medium text-white/70">Mon – Sun</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {VISIT_DAYS.map((day, idx) => {
                    const isActive = idx === activeDayIdx;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setActiveDayIdx(idx)}
                        className={`py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-[#D7B983] text-[#132920] shadow-sm -translate-y-0.5'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={PRIMARY_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOptionalMetaContact('whatsapp', PRIMARY_CONTACT.display)}
                  className="btn-clean inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1E6B47] hover:bg-[#278257] text-white text-sm sm:text-base font-semibold"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>WhatsApp Enquiry</span>
                </a>

                <a
                  href={PRIMARY_CONTACT.telUrl}
                  onClick={() => trackOptionalMetaContact('call', PRIMARY_CONTACT.display)}
                  className="btn-clean inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-[#FAF7F0] text-[#132920] text-sm sm:text-base font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#132920]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
