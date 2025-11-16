// src/contexts/RaceContext.tsx

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Race } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSchedule } from '../api/motogpAPI';

interface RaceContextType {
  userName: string | null;
  allRaces: Race[];
  loading: boolean;
  setUserName: (name: string) => void;
  toggleFavorite: (raceId: string) => void;
  getFavoriteRaces: () => Race[];
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

export const RaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserNameState] = useState<string | null>(null);
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppData = async () => {
      setLoading(true);
      try {
        const [storedName, racesFromApi] = await Promise.all([
          AsyncStorage.getItem('USER_NAME'),
          fetchSchedule()
        ]);

        if (storedName) {
          setUserNameState(storedName);
        }
        
        setRaces(racesFromApi);

      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAppData();
  }, []);

  const setUserName = async (name: string) => {
    try {
      await AsyncStorage.setItem('USER_NAME', name);
      setUserNameState(name);
    } catch (e) {
      console.error("Gagal menyimpan nama:", e);
    }
  };

  const toggleFavorite = useCallback((raceId: string) => {
    setRaces(prevRaces =>
      prevRaces.map(race =>
        race.id === raceId ? { ...race, isFavorited: !race.isFavorited } : race
      )
    );
  }, []);

  const getFavoriteRaces = useCallback(() => {
    return races.filter(race => race.isFavorited);
  }, [races]);

  return (
    <RaceContext.Provider
      value={{
        userName,
        allRaces: races,
        loading,
        setUserName,
        toggleFavorite,
        getFavoriteRaces,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export const useRaces = () => {
  const context = useContext(RaceContext);
  if (context === undefined) {
    throw new Error('useRaces must be used within a RaceProvider');
  }
  return context;
};