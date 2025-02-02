import React, { useState } from "react";
import Image from "next/image";
import female from '../../../../public/avatar/female.svg'

type AvatarSelectorProps = {
  avatar: string;
  setAvatar: (avatar: string) => void;
};

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ avatar, setAvatar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"Ectomorph" | "Mesomorph" | "Endomorph">("Ectomorph");

  const avatars = {
    Ectomorph: [female.src, "/avatars/ecto2.svg", "/avatars/ecto3.svg"],
    Mesomorph: ["/avatars/meso1.svg", "/avatars/meso2.svg", "/avatars/meso3.svg"],
    Endomorph: ["/avatars/endo1.svg", "/avatars/endo2.svg", "/avatars/endo3.svg"],
  };
  console.log("svg object : ", female)

  return (
    <div className="mt-3 relative">
      <button
        className="w-full border p-2 rounded-md text-sm text-gray-700 flex justify-between items-center"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {avatar ? (
          <Image src={avatar} alt="Selected Avatar" width={24} height={24} className="rounded-full" />
        ) : (
          "Choose Avatar"
        )}
        <span>{showDropdown ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown for Avatars */}
      {showDropdown && (
        <div className="w-full bg-gray-50 shadow-md rounded-md p-2 mt-2">
          <h4 className="text-sm font-bold mb-2">Select Avatar</h4>

          {/* Category Selection */}
          <div className="flex justify-between text-xs">
            {Object.keys(avatars).map((category) => (
              <button
                key={category}
                className={`p-1 ${selectedCategory === category ? `bg-gray-200 rounded-t-md` : "bg-white"}`}
                onClick={() => setSelectedCategory(category as "Ectomorph" | "Mesomorph" | "Endomorph")}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Avatar Grid */}
          <div className="grid grid-cols-4 gap-2 p-2 bg-gray-200 max-h-[200px] overflow-auto rounded-md">
            {avatars[selectedCategory].map((img, index) => (
              <Image
                key={index}
                src={img}
                width={100}
                height={100}
                objectFit="cover"
                alt="Avatar"
                className="cursor-pointer bg-white border rounded-md hover:shadow-md aspect-square"
                onClick={() => {
                  setAvatar(img);
                  setShowDropdown(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
