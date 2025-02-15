import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type AvatarSelectorProps = {
  avatar: string;
  setAvatar: (avatar: string) => void;
};

// Function to fetch avatars based on selected category
const fetchAvatars = async (category: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/${category.toLowerCase()}`);
    console.log(`API Response for ${category}:`, response.data); // Debugging

    // Extract the correct category data from the API response
    const categoryData = response.data[category.toLowerCase()];

    if (!categoryData || categoryData.length === 0) {
      console.warn(`No data found for category: ${category}`);
      return [];
    }

    // Find the correct avatar list
    const matchingCategory = categoryData.find((item: any) => item.name.includes(category.toLowerCase()));

    if (!matchingCategory || !matchingCategory[category.toLowerCase()]) {
      console.warn(`No avatars found for category: ${category}`);
      return [];
    }

    return matchingCategory[category.toLowerCase()].map((item: any) => item.link);
  } catch (error) {
    console.error("Error fetching avatars:", error);
    return [];
  }
};

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ avatar, setAvatar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"Ectomorph" | "Mesomorph" | "Endomorph">("Ectomorph");

  // Fetch data whenever the selectedCategory changes
  const { data: avatars = [], isLoading, error } = useQuery({
    queryKey: ["avatars", selectedCategory],
    queryFn: () => fetchAvatars(selectedCategory),
  });

  return (
    <div className="mt-3 relative">
      <h1 className="mb-2 text-xs">Select Avatar</h1>
      <hr />
      <button
        className="mt-2 w-full border p-2 rounded-md text-sm text-gray-700 flex justify-between items-center"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {avatar ? (
          <Image src={avatar} alt="Selected Avatar" width={24} height={24} className="rounded-full aspect-square" />
        ) : (
          "Choose Avatar"
        )}
        <span>{showDropdown ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown for Avatars */}
      {showDropdown && (
        <div className="w-full bg-gray-50 shadow-md rounded-md p-2 mt-2">
          <h4 className="text-sm font-bold mb-2">Select Avatar</h4>

          {/* Category Selection Tabs */}
          <div className="flex justify-between text-xs">
            {["Ectomorph", "Mesomorph", "Endomorph"].map((category) => (
              <button
                key={category}
                className={`p-1 ${selectedCategory === category ? "bg-gray-200 rounded-t-md" : "bg-white"}`}
                onClick={() => setSelectedCategory(category as "Ectomorph" | "Mesomorph" | "Endomorph")}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Avatar Grid */}
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Failed to load avatars</p>
          ) : (
            <div className="grid grid-cols-4 gap-2 p-2 bg-gray-200 max-h-[200px] overflow-auto rounded-md">
              {avatars.map((img: string, index: number) => (
                <Image
                  key={index}
                  src={img}
                  width={100}
                  height={100}
                  alt="Avatar"
                  className="cursor-pointer bg-white border rounded-md hover:shadow-md aspect-square"
                  onClick={() => {
                    setAvatar(img);
                    setShowDropdown(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
