import { create } from "zustand";
import { combine } from "zustand/middleware";
import { persist } from "zustand/middleware";

export type SongType = {
  id: number;
  title: string;
  artist: string;
  url: string;
};

type PlayListStoreType = {
  songs: SongType[] | [];
  isPlaying: boolean;
  currentMusicId: number | undefined;
  volume: number;
};

const initialState: PlayListStoreType = {
  songs: [],
  isPlaying: false,
  currentMusicId: undefined,
  volume: 0.5,
};

export const usePlayListStore = create(
  combine(
    {
      songs: initialState.songs,
      isPlaying: initialState.isPlaying,
      currentMusicId: initialState.currentMusicId,
      volume: initialState.volume,
    },
    (set) => ({
      getMusics: async () => {
        const response = await fetch("/data/playlist.json");
        const { playlist } = await response.json();
        set({ songs: playlist });
        set({ currentMusicId: playlist[0].id });
      },
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setCurrentMusicId: (id: number) => set({ currentMusicId: id }),
      setVolume: (volume: number) => set({ volume }),
    })
  )
);
