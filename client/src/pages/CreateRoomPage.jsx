import { useEffect, useState } from "react";
import Input from "../components/Input";
import generateCode from "../../../server/utils/codeGenerator";

export default function CreateRoomPage({ onCreate }) {
  const [code, setCode] = useState("");
  const [roomName, setRoomName] = useState("")
  const createRoom = async () =>{
    try{
      const token = localStorage.getItem("authToken");
      const response = await fetch("https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:3001/api/rooms",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({name: roomName, code: code}),
      });
      if(response.ok){
        const data = await response.json();
        console.log("Room created successfully:", data);
        onCreate();
      }else{
        console.error("Failed to create room");
      }
    }catch(err){
      console.error("Error creating room:", err);
    }
  }
  const getCode = () =>{
    const newCode = generateCode(8);
    setCode(newCode);
    console.log("code generated: ", newCode);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-green-100">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg mx-auto mt-20">
        <h2 className="text-xl font-bold mb-4 text-center">Create Room</h2>
  
        <div className="flex flex-col gap-4">
          <Input label="Room Name" placeholder="Enter room name" onChange={(e)=>{
            console.log("room name: ", roomName);
            setRoomName(e.target.value);
          }}/>
  
          <button
            className="bg-gray-200 p-2 rounded-lg shadow hover:bg-gray-300 transition"
            onClick={() => getCode()}
          >
            Generate Code
          </button>
  
          <div className="p-2 text-center bg-gray-100 rounded-lg">{code}</div>
  
          <button
            className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
            onClick={createRoom}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
