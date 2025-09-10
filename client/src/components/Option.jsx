export default function Option({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 rounded-lg shadow hover:bg-gray-100 text-left transition"
    >
      {text}
    </button>
  );
}
