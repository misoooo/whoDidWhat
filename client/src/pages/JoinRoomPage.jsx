import { useState } from "react";
import Input from "../components/Input";

export default function JoinRoomPage({ onJoin }) {
  const [code, setCode] = useState("");
  const verifyCode = async () => {
    try{
      
      const response = await fetch(`https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:3001/api/rooms/join/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({code: code})
      })
      if(response.ok){
        const data = await response.json();
        console.log("Room data:", data);
        onJoin();
      }else{
        console.log(response);
        alert("Invalid room code")
      }
    }catch(err){
      console.error("Error verifying code:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="w-96 p-6 bg-gradient-to-br from-pink-100 via-purple-300 to-blue-200 rounded-lg shadow-lg mx-auto mt-20">
        
        <h2 className="text-xl font-bold mb-4 text-center">Join Room</h2>
  
        <div className="flex flex-col gap-4">
          <Input
            label="Room Name"
            placeholder="Enter room code"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
  
          <button
            className="bg-purple-500 text-white p-2 rounded-lg shadow hover:bg-purple-600 transition"
            onClick={verifyCode}
          >
            Join Room
          </button>
        </div>
      </div>
      </div>
  );
}
// AmSfDJcw