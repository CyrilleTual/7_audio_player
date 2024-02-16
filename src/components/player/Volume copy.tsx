"use client";
import { Progress } from "@/components/ui/progress";
import { usePlayListStore } from "@/store/usePlayListStore";

export default function Volume() {

 const setvolume = usePlayListStore((state) => state.setVolume);
  // on recupère le volume actuel
  const player = document.getElementById("audio-player") as HTMLAudioElement;
  const volume = player?.volume * 100;
////////////////////////////////////////////

////////////////////////////////////////////
  function handleVolumeClick(e: any) {
    // on recupère la position du click
    const progressBar = document.getElementById("progressVolum");
    const rect = progressBar?.getBoundingClientRect();
    const y = -(e.clientY - rect!.bottom);
    // on met à jour le volume
    setvolume(y / 100);
  }

  return (
    <Progress
      onClick={(e) => handleVolumeClick(e)}
      id="progressVolum"
      value={volume}
      className=" absolute left-0 bottom-1/2  w-[100px] translate-x-[-50%]  translate-y-3  -rotate-90 hover:cursor-pointer "
    />
  );
}
