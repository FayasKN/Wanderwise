import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { Trash2 } from 'lucide-react';

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (i) => {
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};

export default function MembersPanel() {
  const { members, addMember, removeMember, totalContributions } = useTripContext();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (name.trim() && amount > 0) {
      addMember(name.trim(), amount);
      setName('');
      setAmount('');
    }
  };

  return (
    <section id="members" className="section container">
      <h2 className="font-heading" style={{ fontSize: '3rem', marginBottom: '30px' }}>The Crew</h2>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Member Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>₹</span>
          <input 
            type="number" 
            placeholder="Amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '150px', paddingLeft: '30px' }}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ padding: '10px 30px' }}>Add</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {members.map((member) => (
          <div key={member.id} className="glass-card animate-fade-in-up" style={{ 
            padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                backgroundColor: `#${intToRGB(hashCode(member.name))}`,
                display: 'grid', placeItems: 'center', fontWeight: 'bold', color: '#fff',
                fontSize: '1.2rem'
              }}>
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{member.name}</div>
                <div className="text-muted" style={{ fontSize: '0.9rem' }}>₹{member.amount.toLocaleString('en-IN')}</div>
              </div>
            </div>
            
            <button 
              onClick={() => removeMember(member.id)}
              style={{ padding: '8px', color: 'var(--danger-red)', background: 'rgba(255, 71, 87, 0.1)', borderRadius: '50%' }}
              title="Remove Member"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {members.length > 0 && (
        <div className="glass-card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--accent-gold)' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>Total Pool</span>
          <span className="font-heading text-gold" style={{ fontSize: '2.5rem' }}>₹{totalContributions.toLocaleString('en-IN')}</span>
        </div>
      )}
    </section>
  );
}
