"use client";
import { usePlayListStore } from "@/store/usePlayListStore";

/**
 * Renders a playlist component that displays a list of songs.
 */
export default function PlayList() {
  const { songs, getMusics, currentMusicId, setCurrentMusicId, isPlaying, togglePlay} = usePlayListStore((state) => ({
    songs: state.songs,
    getMusics: state.getMusics,
    currentMusicId: state.currentMusicId,
    setCurrentMusicId: state.setCurrentMusicId,
    isPlaying: state.isPlaying,
    togglePlay: state.togglePlay,
  }));
  if (songs.length === 0) {
    getMusics();
  }
  const changeSong = (id: number) => {
    if(isPlaying){togglePlay()}
    setCurrentMusicId(id);
    togglePlay();
  }

  return (
    <ul className="flex flex-col  justify-center    w-[400px]">
      {songs.length > 0 &&
        songs.map((song) => (
          <li
            onClick={()=>changeSong(song.id)}
            key={song.id}
            className={`p-2 m-2 font-semibold bg-indigo-100 hover:bg-indigo-200 text-slate-800 rounded cursor-pointer
                        ${song.id === currentMusicId ? "bg-indigo-300" : ""}
                        `}
          >
            <span>{song.title}</span> -<span>{song.artist}</span>
          </li>
        ))}
    </ul>
  );
}
