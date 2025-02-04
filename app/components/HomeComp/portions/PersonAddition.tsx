"use client";

import React, { useState } from "react";
import GenderSelector from "../componets/GenderSelector";
import HeightInput from "../componets/HeightInput";
import ColorPicker from "../componets/ColorPicker";
import AvatarSelector from "../componets/AvatarSelector";
import male from '../../../../public/avatar/male.svg'
import { addPerson } from "../localstorage";

const PersonAddition = () => {
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [name, setName] = useState("");
  const [heightType, setHeightType] = useState<"ft" | "cm">("ft");
  const [heightFt, setHeightFt] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ff9800");
  const [avatar, setAvatar] = useState(male.src);

  const handleSubmit = () => {
    const personData = {
      gender,
      name,
      height: heightType === "ft" ? (parseInt(heightFt) * 30.48 + parseInt(heightInch) * 2.54) : parseInt(heightCm),
      heightType: heightType,
      color: selectedColor,
      avatar,
    };

    if (!personData.name || !personData.height || !personData.avatar) {
      console.error("Please fill in all required fields.");
      return;
    }
    
    addPerson(personData.name, personData.color,personData.height , personData.avatar);
    setGender("Male");
    setName("");
    setHeightType("ft");
    setHeightFt("");
    setHeightInch("");
    setHeightCm("");
    setSelectedColor("#ff9800");
    setAvatar(male.src);
    console.log("Person Data:", personData);
  };

  return (
    <div className="w-64">
      <h3 className="text-xs mb-1">Enter Your Details:</h3>
      <hr />

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
