import { useState } from "react";

export default function Header() {
    const [roomOptions, setRoomOptions] = useState();
    //room options will have list of rooms the user is a member of, and selecting a room will change the content of the header-title to the name of the room, and the content of the page to the tasks of that room
    //room options will also have a button to create a new room
    //room options will also have a button to leave the current room
    const [userProfile, setUserProfile] = useState(false);
    //userProfile when positive, will show a side menu with user profile information, a button to logout, and if the user is admin of current room, then an option to changes settings of the room - add members, remove members, change room name, delete room, and will also have a unique code which needs to be used to join the room.
    
    return (
        <div className=" px-4 py-2 bg-[#bae0f8] shadow">
            <span className="flex items-center space-x-6">
                <img
                    src="./src/assets/images/psyduck2.jpg"
                    className="w-14 h-14 rounded-full object-cover "
                />
                <button
                    type="button"
                    className="header-title flex items-center justify-center cursor-pointer bg-[#bae999] p-2 rounded-2xl felx items-center justify-center shadow-md hover:bg-[#bae970] text-white"
                    onClick={() => setRoomOptions(!roomOptions)}
                >
                    Homies 🤜🏻🤛🏻
                </button>
            </span>
        </div>
    );
}
