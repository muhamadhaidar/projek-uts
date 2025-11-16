// src/types/index.ts

export type Race = {
  id: string;
  name: string;
  date: string;
  imageUri: string; 
  isFavorited: boolean;
};

export type RaceResult = {
  id: string;
  position: number;
  driverName: string;
  teamName: string;
  time: string; 
  driverImageUri?: string; 
};

export type PoleSitter = {
  driverName: string;
  teamName: string;
  driverImageUri?: string;
};

export type RaceDetailData = {
  poleSitter: PoleSitter | null; 
  sprintResults: RaceResult[];
  gpResults: RaceResult[];
  // ⬇️ TAMBAHKAN DUA BARIS INI (agar Gist dan Tipe cocok)
  raceHighlightUrl?: string | null;
  sprintHighlightUrl?: string | null;
};