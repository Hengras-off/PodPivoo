import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const key = `streamx_watchlist_${user.email}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setWatchlist(JSON.parse(stored));
        } catch (e) {
          setWatchlist([]);
        }
      }
    } else {
      setWatchlist([]);
    }
  }, [user]);

  const saveWatchlist = (newList) => {
    if (user) {
      const key = `streamx_watchlist_${user.email}`;
      localStorage.setItem(key, JSON.stringify(newList));
      setWatchlist(newList);
    }
  };

  const addToWatchlist = (movie) => {
    if (!user) return false;
    if (isInWatchlist(movie.id)) return false;
    
    const newList = [...watchlist, movie];
    saveWatchlist(newList);
    return true;
  };

  const removeFromWatchlist = (movieId) => {
    if (!user) return;
    const newList = watchlist.filter(m => m.id !== movieId);
    saveWatchlist(newList);
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ 
      watchlist, 
      addToWatchlist, 
      removeFromWatchlist, 
      isInWatchlist 
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};