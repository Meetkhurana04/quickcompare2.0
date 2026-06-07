import { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { LocationInput, type LocationResult } from '../components/LocationInput';
import { SearchInput } from '../components/SearchInput';
import { PlatformMarquee } from '../components/PlatformMarquee';
import { HowItWorks } from '../components/HowItWorks';
import { TextScramble } from '../components/TextScramble';

const POPULAR_SEARCHES = [
  'Amul Butter',
  'Maggi 12 Pack',
  'Eggs Dozen',
  'Lays Classic',
  'Nescafé Classic',
  'Surf Excel 1kg',
];

export function HomePage() {
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const canSubmit = !!location && query.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate(
      `/results?q=${encodeURIComponent(query.trim())}&lat=${location!.lat}&lng=${location!.lng}&city=${encodeURIComponent(location!.city ?? location!.label)}`
    );
  };

  const handlePopular = (term: string) => {
    setQuery(term);
    if (!location) {
      // Focus location if not set
      document.getElementById('location-input')?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden">
        <div className="noise-overlay" />

        {/* Background grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Glow orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-flow-shell-start/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
         
          

          {/* Headline */}

          {/* Sub */}
          <p className="font-mono text-xs sm:text-sm text-text-secondary max-w-xl  mx-auto mb-6 leading-relaxed">
            Compare real-time prices across Blinkit, Zepto, Instamart & more.
            <br />
            <span className="text-text-hint">Zero fluff. Just the best deal.</span>
          </p>

          {/* ── SEARCH CARD ─────────────────────────── */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl mx-auto"
          >
            {/* Backdrop glow */}
            <div className="absolute -inset-12 flex items-center justify-center pointer-events-none opacity-70">
              <div className="w-3/4 h-3/4 rounded-full bg-accent/20 blur-[90px]" />
            </div>

            {/* Card */}
            <div className="relative border border-white/5 bg-surface/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-5 shadow-[0_0_50px_-12px_rgba(233,69,96,0.12),0_8px_40px_-12px_rgba(0,0,0,0.4)]">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 via-40% to-transparent" />

              <LocationInput value={location} onChange={setLocation} />

              <div className="relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-surface px-4 z-10">
                  <span className="font-mono text-[10px] leading-none tracking-[0.15em] text-text-hint/50 uppercase">
                    then
                  </span>
                </div>
                <div className="border-t border-divider/60" />
              </div>

              <SearchInput
                value={query}
                onChange={setQuery}
                locationLocked={!!location}
                canSubmit={canSubmit}
              />
            </div>
          </form>

          {/* Popular searches */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[10px] text-text-hint tracking-widest uppercase mr-1">
              Trending:
            </span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handlePopular(term)}
                className="flex items-center gap-1 px-3 py-1.5 border border-divider bg-surface/50 hover:border-text-hint/40 hover:bg-surface transition-all duration-150 font-mono text-[11px] text-text-secondary hover:text-text-primary"
              >
                <ChevronRight className="w-3 h-3 text-accent" strokeWidth={2} />
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-text-secondary animate-pulse-optimal" />
          <span className="font-mono text-[9px] tracking-widest text-text-secondary uppercase">
            Scroll
          </span>
        </div>
      </section>

      {/* ── PLATFORM MARQUEE ────────────────────────────────── */}
      <PlatformMarquee />

      <PlatformMarquee />

      <div className="max-w-5xl mt-8 mx-auto text-center px-4 sm:px-8">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.9] tracking-tight mb-6">
          <span className="block">
            <TextScramble text="One Search." delay={100} duration={600} />
          </span>
          <span className="block text-text-secondary">
            <TextScramble text="Every Price." delay={350} duration={600} />
          </span>
          <span className="block text-accent">
            <TextScramble text="Instant." delay={600} duration={600} />
          </span>
        </h1>
      </div>


      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <HowItWorks />

      {/* ── STATS STRIP ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-8 md:px-12 border-b border-divider bg-surface/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 border border-divider">
          {[
            { value: '8+', label: 'Platforms Tracked' },
            { value: '2M+', label: 'Products Indexed' },
            { value: '< 2s', label: 'Avg Response' },
            { value: '100%', label: 'Price Accuracy' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-8 border-b md:border-b-0 border-r last:border-r-0 md:last:border-r-0 border-divider flex flex-col justify-center items-center text-center"
            >
              <span className="font-heading text-3xl sm:text-4xl font-semibold text-text-primary mb-2">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-hint">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
