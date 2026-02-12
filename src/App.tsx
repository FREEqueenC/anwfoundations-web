import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ModularTowersSection from './sections/ModularTowersSection';
import HarvestNumbersSection from './sections/HarvestNumbersSection';
import QualitySection from './sections/QualitySection';
import DashboardSection from './sections/DashboardSection';
import SustainabilitySection from './sections/SustainabilitySection';
import StoreSection from './sections/StoreSection';
import CommunitySection from './sections/CommunitySection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import EcoDashboard from './sections/EcoDashboard';
import { PrivacyPolicy, TermsOfService, ShippingReturns } from './sections/LegalPages';

// Import data service
import { dataService, type EcoMetrics } from './services/dataService';

gsap.registerPlugin(ScrollTrigger);

type PageView = 'main' | 'privacy' | 'terms' | 'shipping';

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [ecoMetrics, setEcoMetrics] = useState<EcoMetrics | null>(null);
  const [currentView, setCurrentView] = useState<PageView>('main');

  // Fetch real-time eco metrics
  useEffect(() => {
    // Initial fetch
    dataService.getEcoMetrics().then(setEcoMetrics);

    // Subscribe to updates every 30 seconds
    const unsubscribe = dataService.subscribeToMetrics(setEcoMetrics, 30000);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Global scroll snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Render legal pages
  if (currentView === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentView('main')} />;
  }
  if (currentView === 'terms') {
    return <TermsOfService onBack={() => setCurrentView('main')} />;
  }
  if (currentView === 'shipping') {
    return <ShippingReturns onBack={() => setCurrentView('main')} />;
  }

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Eco Dashboard - Floating with real data */}
      <EcoDashboard metrics={ecoMetrics} />
      
      {/* Main content sections */}
      <main className="relative">
        <HeroSection />
        <ModularTowersSection />
        <HarvestNumbersSection />
        <QualitySection />
        <DashboardSection />
        <SustainabilitySection />
        <StoreSection />
        <CommunitySection />
        <ContactSection />
        <Footer 
          onShowPrivacy={() => setCurrentView('privacy')}
          onShowTerms={() => setCurrentView('terms')}
          onShowShipping={() => setCurrentView('shipping')}
        />
      </main>
    </div>
  );
}

export default App;
