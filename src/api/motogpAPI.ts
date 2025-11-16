// src/api/motogpApi.ts

import { Race, RaceResult, RaceDetailData } from '../types';

const DB_URL = 'https://gist.githubusercontent.com/muhamadhaidar/35db05e6938ccae2085c622fe4d7751a/raw/550703f4c08731b91926626e6f6cf8ff3e5c0c96/motogp_db.json';

let cachedData: {
  schedule: any[];
  results: Record<string, any>;
  defaultResults: RaceDetailData;
} | null = null;

const getDb = async () => {
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await fetch(`${DB_URL}?cache_bust=${new Date().getTime()}`);
    if (!response.ok) throw new Error('Gagal mengambil DB dari Gist');
    const data = await response.json();
    cachedData = data; 
    return data;
  } catch (e) {
    console.error("Gagal fetch DB:", e);
    return null;
  }
};

export const fetchSchedule = async (): Promise<Race[]> => {
  try {
    const db = await getDb();
    if (!db) return []; 

    const gpRaces = db.schedule.filter(race => 
      !race.name.includes("Sprint Race")
    );

    const formattedRaces: Race[] = gpRaces.map((race: any) => ({
      ...race,
      isFavorited: false, 
      date: new Date(race.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }));
    
    const reversedData = formattedRaces.reverse();
    return reversedData;
  } catch (error) {
    console.error("Error di dalam fetchSchedule:", error);
    return []; 
  }
};

export const fetchRaceResults = async (raceId: string): Promise<RaceDetailData> => {
  console.log(`Mengambil hasil (Sprint & GP) untuk Race ID: ${raceId}`);
  
  const db = await getDb();
  if (!db) return { poleSitter: null, sprintResults: [], gpResults: [], raceHighlightUrl: null, sprintHighlightUrl: null }; 

  const results = db.results[raceId] || db.defaultResults;

  return {
    poleSitter: results.poleSitter || null,
    gpResults: results.gpResults || (results.gpWinner ? [results.gpWinner] : []), 
    sprintResults: results.sprintResults || (results.sprintWinner ? [results.sprintWinner] : []),
    raceHighlightUrl: results.raceHighlightUrl || null,
    sprintHighlightUrl: results.sprintHighlightUrl || null
  };
};