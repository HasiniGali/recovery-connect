import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface SavedContextType {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => Promise<boolean>;
  count: number;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const refreshSaved = async () => {
    const ids = await api.getSavedResourceIds();
    setSavedIds(ids);
  };

  useEffect(() => {
    refreshSaved();

    const handleUpdate = () => {
      refreshSaved();
    };

    window.addEventListener('recovery_connect_saved_updated', handleUpdate);
    return () => window.removeEventListener('recovery_connect_saved_updated', handleUpdate);
  }, []);

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSave = async (id: string): Promise<boolean> => {
    if (isSaved(id)) {
      await api.removeSavedResource(id);
      setSavedIds(prev => prev.filter(item => item !== id));
      return false;
    } else {
      await api.saveResource(id);
      setSavedIds(prev => [...prev, id]);
      return true;
    }
  };

  return (
    <SavedContext.Provider value={{ savedIds, isSaved, toggleSave, count: savedIds.length }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = (): SavedContextType => {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within a SavedProvider');
  return ctx;
};
