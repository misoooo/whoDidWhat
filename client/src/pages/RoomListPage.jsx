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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-green-100">
      <div className="w-96 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 tracking-wide">
          Your Rooms
        </h2>
        <div className="flex flex-col gap-4">
          {rooms.map((room) => (
            <Option
              key={room._id}
              text={room.name}
              onClick={() => onSelectRoom(room)}
              className="hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            />
          ))}
          <Option
            text="➕ Create Room"
            onClick={onCreateRoom}
            className="text-blue-600 font-medium hover:bg-blue-50 transition-colors duration-200 rounded-lg"
          />
          <Option
            text="🔗 Join Room"
            onClick={onJoinRoom}
            className="text-green-600 font-medium hover:bg-green-50 transition-colors duration-200 rounded-lg"
          />
        </div>
      </div>
    </div>
  );


}