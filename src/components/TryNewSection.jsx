import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';

export default function TryNewSection() {
  const { resetTrip } = useTripContext();
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleReset = () => {
    resetTrip();
    setShowModal(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section container" style={{ paddingBottom: '150px' }}>
      <div className="glass-card" style={{ padding: '60px', textAlign: 'center', background: 'rgba(10, 15, 30, 0.6)' }}>
        <h2 className="font-heading" style={{ fontSize: '3rem', marginBottom: '15px' }}>Ready for a New Adventure?</h2>
        <p className="font-body text-muted" style={{ fontSize: '1.25rem', marginBottom: '40px' }}>Clear your current trip and start planning your next one.</p>
        <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }} onClick={() => setShowModal(true)}>
          Start a New Trip
        </button>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1001,
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)'
        }}>
          <div className="glass-card animate-fade-in-up" style={{ padding: '40px', maxWidth: '400px', textAlign: 'center' }}>
            <h3 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Are you sure?</h3>
            <p className="text-muted" style={{ marginBottom: '30px' }}>This will permanently delete all your current trip data including members, places, budget, and expenses.</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" style={{ background: 'var(--danger-red)', color: 'white', border: 'none' }} onClick={handleReset}>
                Yes, Reset Trip
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
          {Array.from({ length: 150 }).map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}vw`,
              top: `-10px`,
              backgroundColor: ['#F5A623', '#00D4B4', '#FF4757', '#FFD700', '#FFFFFF'][Math.floor(Math.random() * 5)],
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random() * 0.2}s`
            }}></div>
          ))}
        </div>
      )}
    </section>
  );
}
