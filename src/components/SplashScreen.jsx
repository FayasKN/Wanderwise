import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500); // Wait for fade out
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#0A0F1E', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: show ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: 'none'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className="font-brand" style={{
          fontSize: '4rem', margin: 0,
          animation: 'scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          Wanderwise
        </h1>
        <p className="font-body text-muted" style={{
          fontSize: '1.25rem', marginTop: '10px',
          opacity: 0, animation: 'fadeInUp 0.5s ease 0.5s forwards'
        }}>
          Plan Together. Wander Smarter.
        </p>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: '4px',
        background: 'linear-gradient(90deg, #FFD700, #F5A623)',
        animation: 'progress 2.5s linear forwards'
      }}></div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
