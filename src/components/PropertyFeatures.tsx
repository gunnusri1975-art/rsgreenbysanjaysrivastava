import { Check } from 'lucide-react';
import { FEATURE_GROUPS } from '../data/propertyData';

const GROUP_ACCENTS = [
  {
    borderTop: 'border-t-[#1E6B47]',
    badgeBg: 'bg-[#E7F4EC] text-[#175538]',
    labelColor: 'text-[#1E6B47]',
  },
  {
    borderTop: 'border-t-[#2B5D70]',
    badgeBg: 'bg-[#E8F1F4] text-[#214B5B]',
    labelColor: 'text-[#2B5D70]',
  },
  {
    borderTop: 'border-t-[#9C7A40]',
    badgeBg: 'bg-[#F6EFE2] text-[#7D602E]',
    labelColor: 'text-[#9C7A40]',
  },
  {
    borderTop: 'border-t-[#A65A3A]',
    badgeBg: 'bg-[#F8ECE7] text-[#834328]',
    labelColor: 'text-[#A65A3A]',
  },
] as const;

export function PropertyFeatures() {
  return (
    <section
      id="features"
      className="py-16 sm:py-24 bg-[#EDF3EE] border-y border-[#DCE6DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1E6B47]">
            Specifications
          </span>
          <h2 className="mt-2 font-display font-bold tracking-tight text-forest-deep text-3xl sm:text-4xl leading-tight">
            Property Features &amp; Infrastructure
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Factual site specifications, planned civic utilities, and surrounding area access at RS
            GREEN CITY.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURE_GROUPS.map((group, idx) => {
            const accent = GROUP_ACCENTS[idx % GROUP_ACCENTS.length];
            return (
              <div
                key={group.heading}
                className={`anim-scale-in card-lift rounded-xl bg-white border border-[#DCE4DD] border-t-4 ${accent.borderTop} p-6 sm:p-8 shadow-card hover:shadow-elevated`}
              >
                <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-ivory-border">
                  <h3 className="font-display font-bold text-lg text-forest-deep">
                    {group.heading}
                  </h3>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${accent.labelColor}`}>
                    0{idx + 1}
                  </span>
                </div>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${accent.badgeBg}`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-charcoal">
                          {item.title}
                        </h4>
                        <p className="mt-0.5 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
