import Option from "../components/Option";

export default function ProfileSidebar({ user, role, onClose }) {
  return (
    <div className="fixed top-0 left-0 h-full w-2/3 bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Top section */}
      <div>
        {/* Profile pic + name */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          <Option text="Edit Profile" onClick={() => alert("Edit profile")} />
          <Option text="Dashboard" onClick={() => alert("Dashboard")} />

          {/* Only show if admin */}
          {role === "admin" && (
            <Option
              text="Room Settings"
              onClick={() => alert("Room settings")}
            />
          )}
        </div>
      </div>

      {/* Bottom leave room */}
      <div>
        <Option text="Leave Room" onClick={() => alert("Leave room")} />
      </div>

      {/* Close button (optional) */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-black"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}