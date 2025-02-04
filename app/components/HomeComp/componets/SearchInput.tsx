import React, { useState } from "react";

const suggestions = [
  "Johnny Depp",
  "Naruto",
  "Leonardo DiCaprio",
  "Tom Cruise",
  "Scarlett Johansson",
  "Goku",
  "Luffy",
  "Messi",
  "Cristiano Ronaldo",
  "Taylor Swift",
];

const SearchInput: React.FC<{ searchTerm: string; setSearchTerm: (value: string) => void }> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const matches = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" onMouseLeave={()=>setShowSuggestions(false)} onClick={()=>setShowSuggestions(true)}>
      <input
        type="text"
        placeholder="eg: Johnny Depp, Naruto"
        className="w-full border p-2 rounded-md text-sm outline-none"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-40 overflow-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
