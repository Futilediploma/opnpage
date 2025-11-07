import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Vision from './components/Vision';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SampleDashboard from './pages/SampleDashboard';
import { setupRouter, getCurrentPath } from './utils/router';

function App() {
  const [currentRoute, setCurrentRoute] = useState(getCurrentPath());

  useEffect(() => {
    const cleanup = setupRouter(() => {
      setCurrentRoute(getCurrentPath());
    });
    return cleanup;
  }, []);

  // Route to appropriate page
  if (currentRoute === '/sample') {
    return <SampleDashboard />;
  }

  // Default landing page
  return (
    <div className="min-h-screen">
      {/* Development Badge */}
      <div className="fixed top-0 right-0 z-50 m-4">
        <div className="bg-brand-orange text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Demo Preview · Actively in Development
        </div>
      </div>

      <Header />
      <main>
        <Hero />
        <Features />
        <Vision />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
