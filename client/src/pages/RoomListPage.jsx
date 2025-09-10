import { useEffect, useState } from "react";
import Option from "../components/Option";

export default function RoomListPage({ onSelectRoom, onCreateRoom, onJoinRoom }) {
  const [rooms, setRooms] = useState([]);
  useEffect(()=>{
    const fetchRooms = async () =>{
      try{
        const response = await fetch("https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:3001/api/rooms",);
        const data = await response.json();
        setRooms(data);
        console.log("fetched rooms: ", data)
      }catch(err){
        console.error("Error fetching rooms:", err);
      }
    }
    fetchRooms();
  }, []);
  

  return (
    <div className="w-96 p-6 bg-white rounded-lg shadow-lg mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Your Rooms</h2>
      <div className="flex flex-col gap-3">
        {rooms.map((room, i) => (
          <Option key={i} text={room} onClick={() => onSelectRoom(room)} />
        ))}
        <Option text="Create Room" onClick={onCreateRoom} />
        <Option text="Join Room" onClick={onJoinRoom} />
      </div>
    </div>
  );
}