"use client";

import React, { useState } from "react";
import ColorPicker from "../componets/ColorPicker";
import AvatarSelector from "../componets/AvatarSelector";
import SearchInput from "../componets/SearchInput";

const Celebrity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [avatar, setAvatar] = useState("");

  // Categories and subcategories
  const categories = ["Celebrity", "Athlete", "Fictional"];
  const subCategories = {
    Celebrity: ["Actor", "Singer", "Influencer"],
    Athlete: ["Football", "Basketball", "Tennis"],
    Fictional: ["Movie", "Anime", "Game Character"],
  };

  const persons = {
    Actor: ["Tom Cruise", "Leonardo DiCaprio", "Annabeth Gish"],
    Singer: ["Adele", "Beyonce", "Ed Sheeran"],
    Influencer: ["MrBeast", "PewDiePie", "Emma Chamberlain"],
    Football: ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr"],
    Basketball: ["Michael Jordan", "LeBron James", "Kobe Bryant"],
    Tennis: ["Serena Williams", "Roger Federer", "Rafael Nadal"],
    Movie: ["Batman", "Superman", "Harry Potter"],
    Anime: ["Naruto", "Luffy", "Goku"],
    "Game Character": ["Mario", "Link", "Master Chief"],
  };

  const handleSubmit = () => {
    const personData = {
      searchTerm,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      person: selectedPerson,
      color: selectedColor,
      avatar,
    };
    console.log("Person Data:", personData);
  };

  return (
    <div className="w-64 bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xs font-semibold">Add Celebrities or Figures</h3>

      {/* Search Bar */}
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="text-center text-gray-500 text-xs my-2 flex items-center gap-2">
        <hr className="w-full block" />
        OR
        <hr className="w-full block" />
      </div>

      {/* Category Selection */}
      <div>
        <label className="text-xs font-semibold">Select a category</label>
        <select
          className="w-full border p-2 rounded-md mt-1 text-sm outline-none"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory(""); // Reset subcategory on category change
            setSelectedPerson(""); // Reset person on category change
          }}
        >
          <option value="">Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* SubCategory Dropdown */}
      {selectedCategory && subCategories[selectedCategory] && (
        <div className="mt-2">
          <label className="text-xs font-semibold">{selectedCategory}</label>
          <select
            className="w-full border p-2 rounded-md mt-1 text-sm outline-none"
            value={selectedSubCategory}
            onChange={(e) => {
              setSelectedSubCategory(e.target.value);
              setSelectedPerson(""); // Reset person on subcategory change
            }}
          >
            <option value="">Select {selectedCategory}</option>
            {subCategories[selectedCategory].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      )}

      {/* Specific Person Selection */}
      {selectedSubCategory && persons[selectedSubCategory] && (
        <div className="mt-2">
          <label className="text-xs font-semibold">{selectedSubCategory}</label>
          <select
            className="w-full border p-2 rounded-md mt-1 text-sm outline-none"
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
          >
            <option value="">Choose a person</option>
            {persons[selectedSubCategory].map((person) => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>
      )}

      {/* Color Picker */}
      <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      {/* Avatar Selector */}
      <AvatarSelector avatar={avatar} setAvatar={setAvatar} />

      {/* Submit Button */}
      <button onClick={handleSubmit} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md">
        + Add Person
      </button>
    </div>
  );
};

export default Celebrity;
