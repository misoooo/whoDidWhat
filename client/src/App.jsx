import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomListPage from "./pages/RoomListPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import TaskListPage from "./pages/TaskPage";
import JoinRoomPage from "./pages/JoinRoomPage";

export default function App() {
  const [page, setPage] = useState("auth");
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <>
      {page === "auth" && <AuthPage onAuthSuccess={() => setPage("rooms")} />}
      {page === "rooms" && (
        <RoomListPage
          onSelectRoom={(room) => {
            setSelectedRoom(room);
            setPage("tasks");
          }}
          onCreateRoom={() => setPage("createRoom")}
          onJoinRoom={()=>setPage("joinRoom")}
        />
      )}
      {page === "createRoom" && (
        <CreateRoomPage onCreate={() => setPage("tasks")} />
      )}
      {page === "joinRoom" &&(
        <JoinRoomPage onJoin={() => setPage("tasks")} />
      )}
      {page === "tasks" && <TaskListPage roomName={selectedRoom || "New Room"} />}
    </>
  );
}