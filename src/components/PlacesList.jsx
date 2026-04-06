import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { MapPin, Trash2, CheckCircle, Circle } from 'lucide-react';

export default function PlacesList() {
  const { places, addPlace, removePlace, togglePlace } = useTripContext();
  const [placeName, setPlaceName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (placeName.trim()) {
      addPlace(placeName.trim());
      setPlaceName('');
    }
  };

  const visitedCount = places.filter(p => p.visited).length;

  return (
    <section id="places" className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
        <h2 className="font-heading" style={{ fontSize: '3rem', margin: 0 }}>Our Destinations</h2>
        {places.length > 0 && (
          <div className="glass-card" style={{ padding: '8px 15px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--accent-teal)', border: '1px solid var(--accent-teal)' }}>
            {visitedCount} of {places.length} Visited
          </div>
        )}
      </div>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="New Destination..." 
          value={placeName} 
          onChange={(e) => setPlaceName(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-primary">Add Place</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {places.map((place) => (
          <div key={place.id} className="glass-card animate-slide-left" style={{ 
            padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            opacity: place.visited ? 0.4 : 1, transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, cursor: 'pointer' }} onClick={() => togglePlace(place.id)}>
              <div className="text-teal" style={{ display: 'flex', alignItems: 'center' }}>
                <MapPin size={24} />
              </div>
              <div style={{ 
                fontSize: '1.2rem', fontWeight: '500',
                textDecoration: place.visited ? 'line-through' : 'none'
              }}>
                {place.name}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => togglePlace(place.id)}
                style={{ padding: '8px', color: place.visited ? 'var(--accent-teal)' : 'var(--text-muted)' }}
              >
                {place.visited ? <CheckCircle size={20} /> : <Circle size={20} />}
              </button>
              <button 
                onClick={() => removePlace(place.id)}
                style={{ padding: '8px', color: 'var(--danger-red)' }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {places.length === 0 && (
          <div className="text-muted" style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem' }}>
            No places added yet. Where to?
          </div>
        )}
      </div>
    </section>
  );
}
