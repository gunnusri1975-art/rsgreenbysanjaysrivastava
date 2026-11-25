import { Phone } from 'lucide-react';
import {
  CONTACT_NUMBERS,
  trackOptionalMetaContact,
} from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F2F5F8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto anim-fade-up">
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#125282]">
            Direct Enquiry
          </span>
          <h2 className="mt-2 font-display font-bold tracking-tight text-[#0A2942] text-3xl sm:text-4xl leading-tight">
            Interested in a Residential Plot?
          </h2>
          <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
            Contact our Senior Advisor to learn more about plot sizes, availability and property
            details.
          </p>
        </div>

        {/* Two Clean Distinct Contact Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CONTACT_NUMBERS.map((contact, idx) => (
            <div
              key={contact.id}
              className={`anim-scale-in card-lift rounded-xl p-6 sm:p-8 border shadow-elevated ${
                idx === 0
                  ? 'bg-[#09233C] text-white border-[#09233C]'
                  : 'bg-[#163628] text-white border-[#163628]'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D7B983]">
                {contact.label}
              </span>

              <a
                href={contact.telUrl}
                onClick={() => trackOptionalMetaContact('call', contact.display)}
                className="mt-2.5 block font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white hover:underline underline-offset-4"
              >
                {contact.display}
              </a>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOptionalMetaContact('whatsapp', contact.display)}
                  className="btn-clean inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-[#1E6B47] hover:bg-[#278257] text-white text-sm font-semibold"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={contact.telUrl}
                  onClick={() => trackOptionalMetaContact('call', contact.display)}
                  className="btn-clean inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-semibold bg-white text-[#09233C] hover:bg-[#F5F1E8]"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
