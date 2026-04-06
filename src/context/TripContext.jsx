import React, { createContext, useContext, useEffect, useState } from 'react';

const TripContext = createContext();

export const useTripContext = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [tripName, setTripName] = useState(() => {
    const saved = localStorage.getItem('trip_name');
    return saved ? JSON.parse(saved) : '';
  });

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('trip_members');
    return saved ? JSON.parse(saved) : [];
  });

  const [places, setPlaces] = useState(() => {
    const saved = localStorage.getItem('trip_places');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('trip_budget');
    return saved ? JSON.parse(saved) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('trip_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('trip_name', JSON.stringify(tripName));
  }, [tripName]);

  useEffect(() => {
    localStorage.setItem('trip_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('trip_places', JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem('trip_budget', JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('trip_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addMember = (name, amount) => {
    setMembers([...members, { id: Date.now(), name, amount: Number(amount) }]);
  };

  const removeMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const addPlace = (name) => {
    setPlaces([...places, { id: Date.now(), name, visited: false }]);
  };

  const removePlace = (id) => {
    setPlaces(places.filter(p => p.id !== id));
  };

  const togglePlace = (id) => {
    setPlaces(places.map(p => p.id === id ? { ...p, visited: !p.visited } : p));
  };

  const updateBudget = (amount) => {
    setBudget(Number(amount));
  };

  const addExpense = (description, amount, category) => {
    setExpenses([...expenses, {
      id: Date.now(),
      description,
      amount: Number(amount),
      category,
      timestamp: new Date().toISOString()
    }]);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const resetTrip = () => {
    setTripName('');
    setMembers([]);
    setPlaces([]);
    setBudget(0);
    setExpenses([]);
  };

  const totalContributions = members.reduce((sum, m) => sum + m.amount, 0);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = budget - totalSpent;

  return (
    <TripContext.Provider value={{
      tripName, setTripName,
      members, addMember, removeMember, totalContributions,
      places, addPlace, removePlace, togglePlace,
      budget, updateBudget,
      expenses, addExpense, removeExpense, totalSpent, remainingBudget,
      resetTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};
