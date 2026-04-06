import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { Trash2 } from 'lucide-react';

const categoryIcons = {
  'Food': '🍜',
  'Hotel': '🏨',
  'Travel': '🚗',
  'Shopping': '🛍️',
  'Activities': '🎯',
  'Other': '📦'
};

export default function ExpenseHistory() {
  const { expenses, totalSpent, removeExpense } = useTripContext();
  const [collapsed, setCollapsed] = useState({});

  const toggleCategory = (cat) => {
    setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  if (expenses.length === 0) return null;

  const grouped = expenses.reduce((acc, exp) => {
    if (!acc[exp.category]) acc[exp.category] = { amount: 0, items: [] };
    acc[exp.category].amount += exp.amount;
    acc[exp.category].items.push(exp);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort((a, b) => grouped[b].amount - grouped[a].amount);

  return (
    <section id="expenses" className="section container">
      <h2 className="font-heading" style={{ fontSize: '3rem', marginBottom: '30px' }}>Where the Money Went</h2>

      {/* Bar Chart */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '40px' }}>
        {categories.map(cat => {
          const width = totalSpent > 0 ? (grouped[cat].amount / totalSpent) * 100 : 0;
          return (
            <div key={cat} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                <span>{categoryIcons[cat.split(' ')[0]]} {cat}</span>
                <span className="text-muted">₹{grouped[cat].amount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', width: `${width}%`, background: 'var(--accent-gold)', 
                  borderRadius: '4px', transition: 'width 1s ease-out' 
                }}></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Expense List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {categories.map(cat => (
          <div key={cat} className="glass-card" style={{ overflow: 'hidden' }}>
            <div 
              onClick={() => toggleCategory(cat)}
              style={{ 
                padding: '20px', display: 'flex', justifyContent: 'space-between', 
                alignItems: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{categoryIcons[cat.split(' ')[0]]}</span>
                <span style={{ fontWeight: '600' }}>{cat}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span className="font-heading">₹{grouped[cat].amount.toLocaleString('en-IN')}</span>
                <span style={{ transform: collapsed[cat] ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
              </div>
            </div>
            
            {!collapsed[cat] && (
              <div style={{ padding: '0 20px 20px 20px' }}>
                {grouped[cat].items.map((exp, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', justifyContent: 'space-between', padding: '15px 0',
                    borderBottom: idx < grouped[cat].items.length - 1 ? '1px solid var(--glass-border)' : 'none'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{exp.description}</div>
                      <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                        {new Date(exp.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div className="text-danger" style={{ fontWeight: '600' }}>
                        -₹{exp.amount.toLocaleString('en-IN')}
                      </div>
                      <button 
                        onClick={() => removeExpense(exp.id)}
                        style={{ padding: '6px', color: 'var(--danger-red)', background: 'rgba(255, 71, 87, 0.1)', borderRadius: '50%', display: 'flex' }}
                        title="Delete expense"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
