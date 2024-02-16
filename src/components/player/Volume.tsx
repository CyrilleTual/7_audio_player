"use client";
import { Progress } from "@/components/ui/progress";
import { usePlayListStore } from "@/store/usePlayListStore";
import { useEffect } from "react";

export default function Volume() {
  const setvolume = usePlayListStore((state) => state.setVolume);
  // on recupère le volume actuel
  const volume = usePlayListStore((state) => state.volume)*100;

  ////////////////////////////////////////////
  const progressBar = document.getElementById("progressVolum");

  function updateVolume(e: any) {
    // on recupère la position du click
    const rect = progressBar?.getBoundingClientRect();
    const y = -(e.clientY - rect!.bottom);
    // on met à jour le volume
    setvolume(y / 100 < 1 ? y / 100 : 1);
  }

  function mouseMoveFunction(e: any) {
    updateVolume(e);
  }

  // management of the volume bar : click and drag feature
  useEffect(() => {
    if (progressBar) {
      progressBar.addEventListener("click", function (event:any) {
        updateVolume(event);
      });
      progressBar.addEventListener("mousedown", function () {
        this.addEventListener("mousemove", mouseMoveFunction);
      });
      progressBar.addEventListener("mouseup", function () {
        this.removeEventListener("mousemove", mouseMoveFunction);
      });
      progressBar.addEventListener("mouseleave", function () {
        this.removeEventListener("mousemove", mouseMoveFunction);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressBar]);

  ////////////////////////////////////////////


  return (
    <Progress
      id="progressVolum"
      value={volume}
      className=" absolute left-0 bottom-1/2  w-[100px]  h-6 translate-x-[-40%]  translate-y-3  -rotate-90 hover:cursor-pointer "
    />
  );
}
