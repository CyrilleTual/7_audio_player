"use client";
import { use, useEffect, useRef } from "react";
import { usePlayListStore } from "@/store/usePlayListStore";
import { useProgressStore } from "@/store/useProgressStore";


/**
 * Renders the player component.
 *
 * @returns The JSX element representing the player.
 */
export default function Player() {
  const songs = usePlayListStore((state) => state.songs);
  const isPlaying = usePlayListStore((state) => state.isPlaying);
  const currentMusicId = usePlayListStore((state) => state.currentMusicId);
  const volume = usePlayListStore((state) => state.volume);
  const audioRef = useRef<HTMLAudioElement>(null); 

  const { setCurrent, setTotalDuration } = useProgressStore();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        audioRef.current.volume = volume;
      } else {
        audioRef.current.pause();
      }
    }

  }, [isPlaying, currentMusicId, volume ]);


  const handleLoadedData = () => {
    if (audioRef.current) {
       setTotalDuration(audioRef.current.duration);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrent(audioRef.current.currentTime);
    }
  };



  return (
    <>
      {songs.length > 0 && audioRef && (
        <>
          <audio
            id="audio-player"
            ref={audioRef}
            src={songs.find((song) => song.id === currentMusicId)?.url ?? ''}
            onLoadedData={handleLoadedData}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
        </>
      )}
    </>
  );
}
