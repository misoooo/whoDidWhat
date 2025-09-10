import { useState } from "react";
import Input from "../components/Input";

export default function CreateRoomPage({ onCreate }) {
  const [code, setCode] = useState("ABC123");

  return (
    <div className="w-96 p-6 bg-white rounded-lg shadow-lg mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Create Room</h2>

      <div className="flex flex-col gap-4">
        <Input label="Room Name" placeholder="Enter room name" />

        <button
          className="bg-gray-200 p-2 rounded-lg shadow hover:bg-gray-300 transition"
          onClick={() => setCode("XYZ789")}
        >
          Generate Code
        </button>

        <div className="p-2 text-center bg-gray-100 rounded-lg">{code}</div>

        <button
          className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
          onClick={onCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}
