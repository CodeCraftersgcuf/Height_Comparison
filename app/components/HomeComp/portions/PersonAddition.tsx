"use client";

import React, { useState } from "react";
import GenderSelector from "../componets/GenderSelector";
import HeightInput from "../componets/HeightInput";
import ColorPicker from "../componets/ColorPicker";
import AvatarSelector from "../componets/AvatarSelector";

const PersonAddition = () => {
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [name, setName] = useState("");
  const [heightType, setHeightType] = useState<"ft" | "cm">("ft");
  const [heightFt, setHeightFt] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ff9800");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = () => {
    const personData = {
      gender,
      name,
      height: heightType === "ft" ? `${heightFt}.${heightInch}` : heightCm,
      heightType: heightType,
      color: selectedColor,
      avatar,
    };
    console.log("Person Data:", personData);
  };

  return (
    <div className="w-64 bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xs">Enter Your Details:</h3>

      <GenderSelector gender={gender} setGender={setGender} />

      {/* Name Input */}
      <div className="flex items-center mt-2 border rounded-md">
        <label htmlFor="name" className="bg-gray-200 p-2">Name</label>
        <input
          type="text"
          id="name"
          placeholder="(Optional)"
          className="w-full p-2 text-sm outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <HeightInput
        heightType={heightType}
        setHeightType={setHeightType}
        heightFt={heightFt}
        setHeightFt={setHeightFt}
        heightInch={heightInch}
        setHeightInch={setHeightInch}
        heightCm={heightCm}
        setHeightCm={setHeightCm}
      />

      <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      <AvatarSelector avatar={avatar} setAvatar={setAvatar} />

      {/* Submit Button */}
      <button onClick={handleSubmit} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md">
        + Add Person
      </button>
    </div>
  );
};

export default PersonAddition;
