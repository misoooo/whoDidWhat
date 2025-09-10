export default function Input({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}