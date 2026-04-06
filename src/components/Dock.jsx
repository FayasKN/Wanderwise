import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import ExpenseReceipt from './ExpenseReceipt';

const dockItems = [
  { id: 'members', label: 'Crew', icon: '👥' },
  { id: 'places', label: 'Places', icon: '📍' },
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'expenses', label: 'Expenses', icon: '🧾' },
  { id: 'map', label: 'Map', icon: '🗺️' }
];

export default function Dock() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = dockItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const receiptRef = useRef(null);

  const handleDownload = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, { backgroundColor: '#0A0F1E' });
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'Wanderwise_Receipt.png';
        link.click();
      } catch (err) {
        console.error("Failed to generate receipt image", err);
      }
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ExpenseReceipt ref={receiptRef} />
      <div style={{
      position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, display: 'flex', gap: '10px', padding: '5px 20px',
      background: 'rgba(10, 15, 30, 0.8)', backdropFilter: 'blur(20px)',
      border: '1px solid var(--glass-border)', borderRadius: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      {dockItems.map(item => (
        <button
          key={item.id}
          className="dock-icon"
          onClick={() => scrollTo(item.id)}
          style={{
            position: 'relative', width: '50px', height: '50px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
            background: activeSection === item.id ? 'rgba(255,255,255,0.1)' : 'transparent'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <div className="dock-tooltip">{item.label}</div>
          {item.icon}
          {activeSection === item.id && (
            <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-gold)' }}></div>
          )}
        </button>
      ))}

      <button
        className="dock-icon"
        onClick={handleDownload}
        style={{
          position: 'relative', width: '50px', height: '50px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
          background: 'transparent'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.4)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <div className="dock-tooltip">Download Receipt</div>
        📥
      </button>

      <style>{`
        @media (max-width: 768px) {
          .dock-tooltip {
            opacity: 1 !important;
            top: -25px !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
    </>
  );
}
