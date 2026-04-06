import React from 'react';
import { useTripContext } from '../context/TripContext';

export default function HeroSection() {
  const { tripName, setTripName, members, budget, totalSpent } = useTripContext();
  const percentSpent = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '800px', zIndex: 1 }}>
        <h1 className="font-heading animate-fade-in-up" style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '20px' }}>
          Your Journey,<br />
          <span style={{ position: 'relative', display: 'inline-block' }}>
            Perfectly Planned.
            <div style={{ position: 'absolute', bottom: '10%', left: 0, width: '100%', height: '8px', background: 'var(--accent-gold)', zIndex: -1, opacity: 0.7, transform: 'skew(-15deg)' }}></div>
          </span>
        </h1>

        <p className="font-body text-muted animate-fade-in-up" style={{ fontSize: '1.25rem', marginBottom: '40px', animationDelay: '0.1s' }}>
          Add your crew, set your budget, pin your places — and go.
        </p>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }} className="animate-fade-in-up">
          <button className="btn-primary" onClick={() => scrollTo('members')} style={{ animationDelay: '0.2s' }}>
            Start Planning
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('places')} style={{ animationDelay: '0.3s' }}>
            See How It Works
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }} className="animate-fade-in-up">
          {[
            { label: 'Places Tracked', value: '2,400+', icon: '🌍' },
            { label: 'Budgets Managed', value: '₹18Cr+', icon: '💸' },
            { label: 'Trips Planned', value: '9,800+', icon: '👥' },
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{stat.value}</div>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card animate-fade-in-up" style={{
        position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',
        width: '320px', padding: '20px', display: 'none', animationDelay: '0.5s'
      }} id="hero-mock-card">
        <div style={{ height: '160px', background: '#ccc', borderRadius: '12px', marginBottom: '15px', backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80)', backgroundSize: 'cover' }}></div>
        <input 
          className="font-heading" 
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          style={{ width: '100%', margin: '0 0 10px 0', fontSize: '1.5rem', background: 'transparent', border: 'none', padding: 0, borderBottom: '1px solid rgba(255,255,255,0.2)', borderRadius: 0 }} 
          placeholder="Trip Name..."
        />
        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
          {members.length > 0 ? members.slice(0, 5).map((m, i) => (
             <div key={i} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--glass-bg)', border: '1px solid var(--accent-gold)', display: 'grid', placeItems: 'center', fontSize: '12px', color: '#fff', fontWeight: 'bold' }}>
               {m.name.charAt(0).toUpperCase()}
             </div>
          )) : (
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>No members yet</div>
          )}
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
            <span>Budget</span><span>{Math.round(percentSpent)}%</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ height: '100%', width: `${percentSpent}%`, background: percentSpent > 80 ? 'var(--danger-red)' : 'var(--accent-gold)', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #hero-mock-card {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
