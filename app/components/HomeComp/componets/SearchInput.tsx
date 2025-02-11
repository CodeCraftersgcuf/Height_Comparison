import React, { useState } from "react";

type Item = {
  id: string;
  title: string;
  color: string;
  height: number;
  avatarUrl: string;
  gender?: string;
};

const SearchInput: React.FC<{
  searchTerm: string;
  suggestions: Item[];
  setSearchTerm: (value: string) => void;
  onSelectPerson: (person: Item) => void;
}> = ({ searchTerm, setSearchTerm, suggestions, onSelectPerson }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Item[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const matches = suggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: Item) => {
    setSearchTerm(suggestion.title);
    setShowSuggestions(false);
    onSelectPerson(suggestion);
  };

  return (
    <div className="relative" onMouseLeave={() => setShowSuggestions(false)}>
      <input
        type="text"
        placeholder="e.g., Johnny Depp, Naruto"
        className="w-full border p-2 rounded-md text-sm outline-none"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
