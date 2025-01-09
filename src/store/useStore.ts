import { create } from 'zustand';
import { ReadingPreferences } from '../types';

interface Store {
  readingPreferences: ReadingPreferences;
  setReadingPreferences: (preferences: ReadingPreferences) => void;
  calculatedWpm: number | null;
  setCalculatedWpm: (wpm: number) => void;
}

export const useStore = create<Store>((set) => ({
  readingPreferences: {
    wpm: 200,
    daysToComplete: 7,
    hoursPerDay: 2,
  },
  setReadingPreferences: (preferences) =>
    set({ readingPreferences: preferences }),
  calculatedWpm: null,
  setCalculatedWpm: (wpm) => set({ calculatedWpm: wpm }),
}));