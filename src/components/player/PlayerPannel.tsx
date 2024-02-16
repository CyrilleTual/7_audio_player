"use client";
import React, { useEffect} from "react";
import { usePlayListStore } from "@/store/usePlayListStore";
import PrevBtn from "@/components/player/PrevBtn";
import NextBtn from "./NextBtn";
import TogglePlayBtn from "./TooglePlayBtn";
import ProgressBar from "./ProgressBar";
import { SongType } from "@/store/usePlayListStore";
import Volume from "./Volume";
import { useProgressStore } from "@/store/useProgressStore";
import { formatTime } from "@/lib/utils";  

/**
 * Renders the player panel component.
 *
 * @returns The JSX element representing the player panel.
 */

export default function PlayerPannel() {
  const songs: SongType[] = usePlayListStore((state) => state.songs);
  const togglePlay = usePlayListStore((state) => state.togglePlay);
  const setCurrentMusicId = usePlayListStore((state) => state.setCurrentMusicId);
  const currentMusicId = usePlayListStore((state) => state.currentMusicId);

  // return the current song
  const currentSong:SongType = songs.find(
    (song) => song.id === currentMusicId
  ) as SongType;

  // manages duration and current time of the song
  const { current, totalDuration } = useProgressStore();
  const currentToDisplay = formatTime(current);
  const totalDurationToDisplay = formatTime(totalDuration);

  //// watch the current time to change the song if it's finished
  useEffect(() => {
    if (current >= totalDuration) {
      const actualIndex = songs.findIndex((song) => song.id === currentMusicId);
      const nextMusicId = actualIndex < songs.length - 1 ? songs[actualIndex + 1]?.id : songs[0]?.id;
       togglePlay();
       setCurrentMusicId(nextMusicId);
       togglePlay();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);


 //// return the player panel
  return (
    <div id="player_pannel "className="fixed w-full flex justify-center  bottom-0 rounded border-t-2 border-gray-800 p-6 bg-gradient-to-r from-indigo-100 to-purple-200">
      <div className="max-w[800px]    mx-auto mb-2">
        <div className="flex justify-between">
          {/* display informations on the music */}
          <p>
            {songs.length > 0 && currentSong.title} -{" "}
            {songs.length > 0 && currentSong.artist}
          </p>
          {/* song N° / total of songs  */}
          <p>
            {songs.indexOf(currentSong) + 1} / {songs.length + 1}
          </p>
        </div>

        {/* Controls  */}
        <div className="flex justify-center items-center ">
          <PrevBtn />
          <TogglePlayBtn />
          <NextBtn />
        </div>

        {/* Progress bar  */}
        <div className="mt-3 flex justify-center">
          <span>{currentToDisplay}</span>
          <ProgressBar />
          <span>{totalDurationToDisplay}</span>
        </div>
      </div>

      {/* volume controler */}
      <div className="  w-[20px] relative">
        <Volume />
      </div>
    </div>
  );
}
