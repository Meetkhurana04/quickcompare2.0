import { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-divider'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div className="absolute -inset-0.5 bg-accent/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-base font-semibold text-text-primary tracking-tight">
              QuickCompare
            </span>
            <span className="font-mono text-[9px] text-text-hint tracking-widest uppercase">
              Price Intel
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 font-mono text-xs text-text-hint">
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-optimal" />
            <span className="tracking-widest uppercase">Live</span>
          </span>
        </div>
      </div>
    </header>
  );
}
