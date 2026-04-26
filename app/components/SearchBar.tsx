
interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-icon"></span>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search users"
      />
      {value && (
        <button className="clear-btn" onClick={() => onChange("")}>
          ✕
        </button>
      )}
    </div>
  );
}
