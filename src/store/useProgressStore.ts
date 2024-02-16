import { create } from "zustand";

export type ProgressStoreType = {
  current: number;
  totalDuration: number;
  setTotalDuration: (duration: number) => void;
  setCurrent: (current: number) => void;
};

/**
 * Creates the progress store.
 *
 * @returns The progress store.
 */
export const useProgressStore = create<ProgressStoreType>((set) => ({
    current: 0,
    totalDuration: 0,
    setTotalDuration: (duration: number) => set({ totalDuration: duration }),
    setCurrent: (current: number) => set({ current }),
}));

