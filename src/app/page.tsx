import PlayList from "@/components/PlayList";
import Player from "@/components/Player";
import PlayerPannel from "@/components/player/PlayerPannel";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen ng-slate-800 pt-20 px-4 text-slate-200">
        <div
          id="play_list"
          className="  flex flex-col justify-center items-center  max-w-xl mx-auto"
        >
          {/* player audio */}
          <h1 className="text-2xl  w-[400px] p-2 m-2">Player audio</h1>
          <PlayList />
          {/* playlist */}
        </div>
        <Player />
        {/* player pannel */}
      </div>
      <PlayerPannel />
    </main>
  );
}
