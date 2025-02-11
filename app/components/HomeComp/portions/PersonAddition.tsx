"use client";

import React, { useState } from "react";
import GenderSelector from "../componets/GenderSelector";
import HeightInput from "../componets/HeightInput";
import ColorPicker from "../componets/ColorPicker";
import AvatarSelector from "../componets/AvatarSelector";
import male from '../../../../public/avatar/male.svg';
import { addPerson } from "../localstorage";

const PersonAddition = ({ onAddItem }: { onAddItem: (item: any) => void }) => {
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [name, setName] = useState("");
  const [heightType, setHeightType] = useState<"ft" | "cm">("ft");
  const [heightFt, setHeightFt] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [avatar, setAvatar] = useState(male.src);

  const handleSubmit = () => {
    const height =
      heightType === "ft"
        ? parseInt(heightFt) * 30.48 + parseInt(heightInch) * 2.54
        : parseInt(heightCm);

    if (!name || !height || !avatar) {
      console.error("Please fill in all required fields.");
      return;
    }

    // Add to localStorage
    // the selectedcolor is not selected then use rand math for colro
    const color = selectedColor || `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    const newPerson = addPerson(name, color, height, avatar);

    // Update parent component state
    onAddItem(newPerson[newPerson.length - 1]);
    // setGender("Male");
    // setName("");
    // setHeightType("ft");
    // setHeightFt("");
    // setHeightInch("");
    // setHeightCm("");
    // setSelectedColor("#ff9800");
    // setAvatar(male.src);
  };

  return (
    <div className="">
      <h3 className="text-xs mb-1">Enter Your Details:</h3>
      <hr />

      <GenderSelector gender={gender} setGender={setGender} />

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

      <button onClick={handleSubmit} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md">
        + Add Person
      </button>
    </div>
  );
};

export default PersonAddition;
