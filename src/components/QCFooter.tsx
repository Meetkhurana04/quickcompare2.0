import { useEffect, useState } from 'react';

export function QCFooter() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="bg-background py-8 sm:py-12 px-4 sm:px-8 md:px-12 border-t border-divider flex flex-col md:flex-row justify-between items-start md:items-end min-h-[20vh]">
      <div className="font-mono text-text-hint text-xs sm:text-sm mb-6 md:mb-0">
        <span className="text-text-primary">&gt;</span> QuickCompare.init(
        <span className="text-accent">india</span>)
        <span
          className={`inline-block w-2 h-4 bg-text-primary ml-1 align-middle transition-opacity ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-[9px] uppercase tracking-widest text-text-hint">
        <span className="text-text-secondary">© 2026 QUICKCOMPARE</span>
        <span>Prices updated in real-time · Not affiliated with any platform</span>
      </div>
    </footer>
  );
}
