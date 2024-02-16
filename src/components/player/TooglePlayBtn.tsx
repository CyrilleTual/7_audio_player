import { Pause, Play } from "lucide-react";
import { usePlayListStore } from "@/store/usePlayListStore";
import { use, useEffect } from "react";

export default function TooglePlayBtn() {
  const isPlaying = usePlayListStore((state) => state.isPlaying);
  const togglePlay = usePlayListStore((state) => state.togglePlay);

  useEffect(() => {
    // rerender the component when the isPlaying state changes
  }, [isPlaying]);

  return (
    <>
      <div className="p-4 bg-white rounded-full mx-5 cursor-pointer hover:bg-slate-100"  onClick={()=>togglePlay()}>
        {isPlaying ? <Pause size={25} /> : <Play size={25} />}
      </div>
    </>
  );
}
