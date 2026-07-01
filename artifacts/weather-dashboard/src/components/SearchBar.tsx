import { useState, useRef, type KeyboardEvent } from "react";
import { Search, Loader2, MapPin } from "lucide-react";

const SUGGESTED_CITIES = ["London", "Tokyo", "New York", "Dubai", "Sydney", "Moscow", "Paris", "Singapore"];

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = SUGGESTED_CITIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  function handleSubmit() {
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    setShowSuggestions(false);
    onSearch(trimmed);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") setShowSuggestions(false);
  }

  function handleSelect(city: string) {
    setQuery(city);
    setShowSuggestions(false);
    onSearch(city);
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 glass-card rounded-2xl px-5 py-3.5 focus-within:border-white/20 transition-colors">
        {isLoading ? (
          <Loader2 size={20} className="text-white/40 shrink-0 animate-spin" />
        ) : (
          <Search size={20} className="text-white/40 shrink-0" />
        )}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKey}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Search for a city..."
          className="flex-1 bg-transparent text-white placeholder:text-white/30 text-base outline-none min-w-0"
          aria-label="Search city"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="shrink-0 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-1.5 rounded-xl transition-colors"
        >
          Search
        </button>
      </div>

      {/* Autocomplete dropdown */}
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 glass-card rounded-2xl overflow-hidden z-50 border border-white/10">
          {filtered.map((city) => (
            <button
              key={city}
              onMouseDown={() => handleSelect(city)}
              className="w-full flex items-center gap-3 px-5 py-3 text-left text-white/80 hover:bg-white/08 hover:text-white transition-colors text-sm"
            >
              <MapPin size={14} className="text-white/30 shrink-0" />
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Quick city pills */}
      {!query && (
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {SUGGESTED_CITIES.slice(0, 6).map((city) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className="text-xs text-white/40 hover:text-white/70 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
