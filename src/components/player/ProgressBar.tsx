import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/store/useProgressStore";

/**
 * Renders the progress bar component.
 *
 * @returns The JSX element representing the progress bar.
 */
export default function ProgressBar() {
  const { current, totalDuration } = useProgressStore();
  const progress = (current / totalDuration) * 100;

  function handlClick(e: React.MouseEvent<HTMLDivElement>) {
    // calculate the new progress
    const progressBar = document.getElementById("progressBar");
    const rect = progressBar?.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const width = progressBar?.clientWidth;
    const progress = (x / width!) * 100;
    // set new current time of the song to the player
    const player = document.getElementById("audio-player") as HTMLAudioElement;
    player.currentTime = (progress / 100) * totalDuration;
  }

  return (
    <div onMouseDown={(e)=>handlClick(e)}   id="progressBar" className="w-80 mx-5 hover:cursor-pointer" >
      <Progress value={progress} />
    </div>
  );
}
