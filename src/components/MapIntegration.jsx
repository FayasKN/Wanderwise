import React, { useState, useEffect } from 'react';

export default function MapIntegration() {
  const [destination, setDestination] = useState('');
  const [activeDest, setActiveDest] = useState('');
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);

  useEffect(() => {
    if (!activeDest) return;
    
    const fetchPlaces = async () => {
      setIsLoadingPlaces(true);
      try {
        const query = encodeURIComponent(`tourist attractions in ${activeDest}`);
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json&origin=*&srlimit=6`);
        const data = await res.json();
        setTouristPlaces(data.query?.search || []);
      } catch (err) {
        console.error("Failed to fetch tourist places:", err);
      } finally {
        setIsLoadingPlaces(false);
      }
    };

    fetchPlaces();
  }, [activeDest]);

  const handleShowMap = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      setActiveDest(destination.trim());
    }
  };

  const quickSearches = [
    { label: 'Restaurants nearby', icon: '🍽️', type: 'Restaurants' },
    { label: 'Hotels nearby', icon: '🏨', type: 'Hotels' },
    { label: 'Attractions nearby', icon: '🎡', type: 'Attractions' },
    { label: 'ATMs nearby', icon: '🏧', type: 'ATMs' }
  ];

  const handleQuickSearch = (type) => {
    if (!activeDest) return;
    const query = `${type}+nearby+${activeDest.replace(/\s+/g, '+')}`;
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  return (
    <section id="map" className="section container">
      <h2 className="font-heading" style={{ fontSize: '3rem', marginBottom: '30px' }}>Find Your Way</h2>

      <form onSubmit={handleShowMap} style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="Enter a destination (e.g., Paris, Tokyo)..." 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-primary">Show on Map</button>
      </form>

      {activeDest ? (
        <div className="animate-fade-in-up">
          <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--accent-gold)', marginBottom: '30px' }}>
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${activeDest.replace(/\s+/g, '+')}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
            {quickSearches.map((search, idx) => (
              <button 
                key={idx} 
                className="glass-card" 
                onClick={() => handleQuickSearch(search.type)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px' }}
              >
                <span>{search.icon}</span>
                <span>{search.label}</span>
              </button>
            ))}
          </div>

          <div className="glass-card" style={{ padding: '40px', marginTop: '40px', background: 'rgba(10, 15, 30, 0.4)' }}>
            <h3 className="font-heading" style={{ fontSize: '2rem', marginBottom: '25px' }}>
              Highlights in {activeDest}
            </h3>
            
            {isLoadingPlaces ? (
              <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                Discovering local sights...
              </div>
            ) : touristPlaces.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {touristPlaces.map((place) => (
                  <div key={place.pageid} className="glass-card animate-fade-in-up" style={{ padding: '20px', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.03)' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: 'var(--accent-teal)', fontSize: '1.2rem' }}>{place.title}</h4>
                    <p className="text-muted font-body" style={{ 
                      fontSize: '0.9rem', flex: 1, margin: 0, overflow: 'hidden', 
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                      lineHeight: '1.5'
                    }} dangerouslySetInnerHTML={{ __html: place.snippet + '...' }}></p>
                    <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--glass-border)' }}>
                      <a 
                        href={`https://en.wikipedia.org/?curid=${place.pageid}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      >
                        Read more ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted">No specific attractions were indexed. Try using the quick-search buttons!</div>
            )}
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '4rem' }}>🗺️</div>
          <p>Enter a destination above to view the map.</p>
        </div>
      )}
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
