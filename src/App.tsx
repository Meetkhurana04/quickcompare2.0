import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { QCFooter } from './components/QCFooter';
import { HomePage } from './pages/HomePage';

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-background text-text-primary min-h-screen font-mono selection:bg-accent selection:text-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Results page — stubbed, will be implemented with API in next phase */}
        <Route
          path="/results"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <p className="font-mono text-text-hint text-sm">
                Results page coming soon — API integration in next phase.
              </p>
            </div>
          }
        />
      </Routes>
      <QCFooter />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}