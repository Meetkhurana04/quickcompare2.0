import { MapPin, Search, TrendingDown } from 'lucide-react';

const STEPS = [
  {
    index: '01',
    icon: MapPin,
    title: 'Pin Your Location',
    description:
      'Search and select your area. We use precise coordinates to fetch prices from platforms serving your pin code.',
    tag: 'GEOLOCATION',
  },
  {
    index: '02',
    icon: Search,
    title: 'Name Your Product',
    description:
      'Type any product — "maggi 12 pack", "amul butter 500g", "nescafé classic". Our engine normalises the query.',
    tag: 'SMART SEARCH',
  },
  {
    index: '03',
    icon: TrendingDown,
    title: 'Compare & Save',
    description:
      'See prices, delivery time, and total cost across Blinkit, Zepto, Instamart and more — all in one view.',
    tag: 'PRICE INTEL',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-8 md:px-12 border-b border-divider">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 sm:mb-20 border-b border-divider pb-4">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
            How It Works
          </h2>
          <span className="font-mono text-xs text-text-hint hidden sm:block tracking-widest">
            3 STEPS
          </span>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-divider">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative p-8 border-b md:border-b-0 md:border-r last:border-0 border-divider group hover:bg-surface transition-colors duration-200"
              >
                {/* Step number — large BG */}
                <div className="absolute top-6 right-6 font-heading text-7xl sm:text-8xl font-semibold text-text-primary/[0.04] select-none pointer-events-none leading-none">
                  {step.index}
                </div>

                {/* Tag */}
                <div className="font-mono text-[10px] tracking-widest text-accent mb-8">
                  [{step.tag}]
                </div>

                <Icon
                  className="w-5 h-5 text-text-secondary mb-6 group-hover:text-accent transition-colors duration-200"
                  strokeWidth={1.5}
                />

                <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-tight mb-4 text-text-primary">
                  {step.title}
                </h3>

                <p className="font-mono text-sm text-text-secondary leading-relaxed group-hover:text-text-primary/70 transition-colors">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
