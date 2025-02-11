"use client";

import React, { useState } from "react";
import ColorPicker from "../componets/ColorPicker";
import AvatarSelector from "../componets/AvatarSelector";
import SearchInput from "../componets/SearchInput";
import { addPerson } from "../localstorage";
import male from "../../../../public/avatar/male.svg";
import female from "../../../../public/avatar/female.svg";

const Celebrity = ({ onAddItem }: { onAddItem: (item: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState(""); // Only for Fictional
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("#ff9800");
  const [avatar, setAvatar] = useState("");

  const categories = ["Celebrity", "Athlete", "Fictional"];

  const subCategories: Record<string, string[]> = {
    Celebrity: ["Actor", "Singer", "Influencer", "Musician", "Politician"],
    Athlete: ["Football", "Basketball", "Tennis", "Golf", "Boxing"],
    Fictional: ["Anime", "Movie", "Game", "Comic"],
  };

  const franchises: Record<string, string[]> = {
    Anime: ["Naruto", "One Piece", "Dragon Ball", "Attack on Titan"],
    Movie: ["Marvel", "Harry Potter", "Lord of the Rings", "Star Wars"],
    Game: ["Zelda", "Pokemon", "Halo", "Final Fantasy"],
    Comic: ["DC Comics", "Marvel Comics", "Image Comics"],
  };

  const persons: Record<string, any[]> = {
    Actor: [
      { title: "Tom Cruise", color: "#2ECC71", height: 170, avatarUrl: male.src },
      { title: "Leonardo DiCaprio", color: "#3498DB", height: 183, avatarUrl: male.src },
    ],
    Singer: [
      { title: "Adele", color: "#FF9800", height: 165, avatarUrl: female.src },
      { title: "Beyonce", color: "#E91E63", height: 169, avatarUrl: female.src },
    ],
    Naruto: [
      { title: "Naruto Uzumaki", color: "#FFA500", height: 166, avatarUrl: male.src },
      { title: "Sasuke Uchiha", color: "#3F51B5", height: 168, avatarUrl: male.src },
    ],
    Marvel: [
      { title: "Iron Man", color: "#B71C1C", height: 178, avatarUrl: male.src },
      { title: "Spider-Man", color: "#FF1744", height: 170, avatarUrl: male.src },
    ],
  };

  // Celebrity Suggestions List
  const suggestions = [
    { title: "Johnny Depp", color: "#FF5733", height: 178, avatarUrl: male.src, gender: "Male" },
    { title: "Naruto", color: "#FFA500", height: 166, avatarUrl: female.src, gender: "Male" },
  ];

  // **Auto-add person when selected from search**
  const handleSelectPerson = (person: any) => {
    const newPerson = addPerson(person.title, person.color, person.height, person.avatarUrl);
    onAddItem(newPerson[newPerson.length - 1]);
    setSearchTerm("");
  };

  const handleSubmit = () => {
    if (!selectedPerson) {
      console.error("Please select a person.");
      return;
    }

    const personData = {
      title: selectedPerson.title,
      color: selectedColor,
      height: selectedPerson.height || Math.floor(Math.random() * (200 - 150 + 1)) + 150,
      avatarUrl: avatar || selectedPerson.avatarUrl,
    };

    const newPerson = addPerson(personData.title, personData.color, personData.height, personData.avatarUrl);
    onAddItem(newPerson[newPerson.length - 1]);

    // Reset fields
    setSelectedPerson(null);
    setSelectedColor("#ff9800");
    setAvatar("");
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xs font-semibold">Add Celebrities or Figures</h3>

      {/* Search Bar */}
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        onSelectPerson={handleSelectPerson}
      />

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
            setSelectedSubCategory("");
            setSelectedFranchise("");
            setSelectedPerson(null);
          }}
        >
          <option value="">Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
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
              setSelectedFranchise("");
              setSelectedPerson(null);
            }}
          >
            <option value="">Select {selectedCategory}</option>
            {subCategories[selectedCategory].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Specific Person Selection for Celebrity */}
      {selectedSubCategory && persons[selectedSubCategory] && (
        <div className="mt-2">
          <label className="text-xs font-semibold">{selectedSubCategory}</label>
          <select
            className="w-full border p-2 rounded-md mt-1 text-sm outline-none"
            value={selectedPerson?.title || ""}
            onChange={(e) => {
              const foundPerson = persons[selectedSubCategory].find((p) => p.title === e.target.value);
              setSelectedPerson(foundPerson);
              setSelectedColor(foundPerson?.color || "#ff9800");
              setAvatar(foundPerson?.avatarUrl || "");
            }}
          >
            <option value="">Choose a person</option>
            {persons[selectedSubCategory].map((person) => (
              <option key={person.title} value={person.title}>
                {person.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Color & Avatar Selection */}
      <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <AvatarSelector avatar={avatar} setAvatar={setAvatar} />

      <button onClick={handleSubmit} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md">
        + Add Person
      </button>
    </div>
  );
};

export default Celebrity;
