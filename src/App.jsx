import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import MembersPanel from './components/MembersPanel';
import PlacesList from './components/PlacesList';
import BudgetTracker from './components/BudgetTracker';
import ExpenseHistory from './components/ExpenseHistory';
import MapIntegration from './components/MapIntegration';
import TryNewSection from './components/TryNewSection';
import Dock from './components/Dock';

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <ParticleBackground />
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      
      <div style={{ 
        opacity: splashDone ? 1 : 0, 
        transition: 'opacity 0.8s ease',
        visibility: splashDone ? 'visible' : 'hidden' 
      }}>
        <HeroSection />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="app-grid">
          <MembersPanel />
          <PlacesList />
        </div>
        
        <BudgetTracker />
        <ExpenseHistory />
        <MapIntegration />
        <TryNewSection />
        
        <Dock />
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .app-grid {
            grid-template-columns: 1fr 1fr !important;
            max-width: 1200px;
            margin: 0 auto;
            align-items: start;
          }
          .app-grid > section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </>
  );
}

export default App;
