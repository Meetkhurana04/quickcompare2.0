import { useEffect, useRef } from 'react';

const PLATFORMS = [
  { name: 'Blinkit', color: '#F9C21C' },
  { name: 'Zepto', color: '#8B3DFF' },
  { name: 'Swiggy Instamart', color: '#FC8019' },
  { name: 'BigBasket Now', color: '#84C225' },
  { name: 'Dunzo Daily', color: '#00D4AA' },
  { name: 'JioMart Express', color: '#0063DC' },
  { name: 'Amazon Fresh', color: '#FF9900' },
  { name: 'Flipkart Minutes', color: '#2874F0' },
];

export function PlatformMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    let raf: number;

    const step = () => {
      pos -= 0.5;
      if (track.scrollWidth && Math.abs(pos) >= track.scrollWidth / 2) {
        pos = 0;
      }
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const doubled = [...PLATFORMS, ...PLATFORMS];

  return (
    <div className="py-6 border-y border-divider overflow-hidden relative bg-surface/30">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div className="flex items-center">
        <div ref={trackRef} className="flex items-center gap-0 flex-shrink-0 will-change-transform">
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 border-r border-divider flex-shrink-0"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: p.color }}
              />
              <span className="font-mono text-xs text-text-secondary tracking-widest uppercase whitespace-nowrap">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
