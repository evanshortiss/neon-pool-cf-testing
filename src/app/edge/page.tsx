import { RoomProvider } from "@/liveblocks.config";

export default function Page() {
  console.log(RoomProvider)
    return (
    <div>
        <h1>hola</h1>
      {/* <RoomProvider id="test" initialPresence={{}}>
        <div></div>
      </RoomProvider> */}
    </div>
  );
}
