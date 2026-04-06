import React, { useState, useEffect } from 'react';
import { useTripContext } from '../context/TripContext';

export default function BudgetTracker() {
  const { budget, updateBudget, addExpense, totalSpent, remainingBudget } = useTripContext();
  const [budgetInput, setBudgetInput] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expCat, setExpCat] = useState('Food');
  const [isCrashed, setIsCrashed] = useState(false);

  useEffect(() => {
    if (budget > 0 && remainingBudget <= 0) {
      setIsCrashed(true);
      const timer = setTimeout(() => setIsCrashed(false), 800);
      return () => clearTimeout(timer);
    }
  }, [remainingBudget, budget]);

  const handleSetBudget = (e) => {
    e.preventDefault();
    if (budgetInput > 0) {
      updateBudget(budgetInput);
      setBudgetInput('');
    }
  };

  const handleLogExpense = (e) => {
    e.preventDefault();
    if (expAmount > 0 && expDesc.trim()) {
      addExpense(expDesc.trim(), expAmount, expCat);
      setExpAmount('');
      setExpDesc('');
    }
  };

  const percentSpent = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const isOverSpent = percentSpent > 80;
  const ringColor = isOverSpent ? 'var(--danger-red)' : 'var(--accent-gold)';
  
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(percentSpent, 100) / 100) * circumference;

  return (
    <section id="budget" className="section container">
      <h2 className="font-heading" style={{ fontSize: '3rem', marginBottom: '30px' }}>Trip Budget</h2>

      <form onSubmit={handleSetBudget} style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>₹</span>
          <input 
            type="number" 
            placeholder="Total Trip Budget" 
            value={budgetInput} 
            onChange={(e) => setBudgetInput(e.target.value)}
            style={{ width: '100%', paddingLeft: '30px', fontSize: '1.2rem', padding: '15px 15px 15px 30px' }}
          />
        </div>
        <button type="submit" className="btn-primary">Set Budget</button>
      </form>

      {budget > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
              <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="80" cy="80" r={radius} fill="transparent" stroke="var(--glass-border)" strokeWidth="12" />
                <circle cx="80" cy="80" r={radius} fill="transparent" stroke={ringColor} strokeWidth="12" 
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease' }} 
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-heading" style={{ fontSize: '1.5rem' }}>{Math.round(percentSpent)}%</span>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>Spent</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '50px' }}>
            <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <div className="text-muted" style={{ marginBottom: '10px' }}>Total Budget</div>
              <div className="font-heading" style={{ fontSize: '1.8rem' }}>₹{budget.toLocaleString('en-IN')}</div>
            </div>
            <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <div className="text-muted" style={{ marginBottom: '10px' }}>Amount Spent</div>
              <div className="font-heading text-gold" style={{ fontSize: '1.8rem' }}>₹{totalSpent.toLocaleString('en-IN')}</div>
            </div>
            <div className={`glass-card ${isCrashed ? 'text-danger' : ''}`} style={{ 
              padding: '20px', textAlign: 'center',
              animation: isCrashed ? 'shake 0.4s ease-in-out' : 'none',
              border: remainingBudget < 0 ? '1px solid var(--danger-red)' : ''
            }}>
              <div className="text-muted" style={{ marginBottom: '10px', color: isCrashed ? 'var(--danger-red)' : '' }}>Remaining</div>
              <div className="font-heading" style={{ fontSize: '1.8rem' }}>₹{remainingBudget.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </>
      )}

      <div className="glass-card" style={{ padding: '30px' }}>
        <h3 className="font-heading" style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.5rem' }}>Log Expense</h3>
        <form onSubmit={handleLogExpense} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <select value={expCat} onChange={(e) => setExpCat(e.target.value)} style={{ minWidth: '150px' }}>
            <option value="Food">🍜 Food</option>
            <option value="Hotel">🏨 Hotel</option>
            <option value="Travel">🚗 Travel</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Activities">🎯 Activities</option>
            <option value="Other">📦 Other</option>
          </select>
          <input 
            type="text" 
            placeholder="Description (e.g., Dinner at Bali)" 
            value={expDesc} 
            onChange={(e) => setExpDesc(e.target.value)}
            style={{ flex: 2, minWidth: '200px' }}
          />
          <input 
            type="number" 
            placeholder="Amount" 
            value={expAmount} 
            onChange={(e) => setExpAmount(e.target.value)}
            style={{ flex: 1, minWidth: '120px' }}
          />
          <button type="submit" className="btn-primary" style={{ flex: '1 1 100%' }}>Log Expense</button>
        </form>
      </div>

    </section>
  );
}
