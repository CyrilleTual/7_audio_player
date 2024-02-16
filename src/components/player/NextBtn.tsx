" use client";
import { SkipForward } from "lucide-react";
import { usePlayListStore } from "@/store/usePlayListStore";
import { useEffect, useState } from "react";

export default function NextBtn() {
  const { songs, currentMusicId, isPlaying, togglePlay, setCurrentMusicId } =
    usePlayListStore((state) => ({
      songs: state.songs,
      currentMusicId: state.currentMusicId,
      isPlaying: state.isPlaying,
      togglePlay: state.togglePlay,
      setCurrentMusicId: state.setCurrentMusicId,
    }));

  const [nextMusicId, setNextMusicId] = useState<number>(currentMusicId!);

  useEffect(() => {
    if (currentMusicId) {
      const actualIndex = songs.findIndex((song) => song.id === currentMusicId);
      setNextMusicId(
        actualIndex < songs.length - 1 ? songs[actualIndex + 1].id : songs[0].id
      );
    }
  }, [currentMusicId, songs]);

  function change() {
    if (isPlaying) {
      togglePlay();
      setCurrentMusicId(nextMusicId);
      togglePlay();
    } else {
      setCurrentMusicId(nextMusicId);
    }
  }

  return (
    <div className="p-2 bg-white rounded-full cursor-pointer hover:bg-slate-100" onClick={change}>
      <SkipForward strokeWidth={2.25} />
    </div>
  );
}
