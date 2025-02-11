"use client";

import React, { useState } from "react";
import Image from "next/image";
import { addPerson } from "../localstorage";

type ImageType = {
  title: string;
  color: string;
  height: number;
  avatarUrl: string;
};

type ImagePortionProps = {
  onAddItem: (newItem: ImageType[]) => void;
};

const ImagePortion = ({ onAddItem }: ImagePortionProps) => {
  const [activeTab, setActiveTab] = useState<"AddNew" | "MyImages">("AddNew");
  const [uploadedImages, setUploadedImages] = useState<ImageType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Filter uploaded images based on search
  const filteredImages = uploadedImages.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add uploaded image to list and execute handleSelect
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only PNG, JPEG, SVG, JPG are allowed.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        title:"upload image",
        avatarUrl: e.target?.result as string,
        color: 'black',
        height: 200,
      };

      setUploadedImages((prev) => {
        const updatedImages = [...prev, newImage];
        handleSelect(newImage); // Execute handleSelect after upload
        return updatedImages;
      });
    };
    reader.readAsDataURL(file);
  };

  // Function to handle selecting an image (on click)
  const handleSelect = (image: ImageType) => {
    console.log(image);
    const newPerson = addPerson(image.title,image.color,image.height,image.avatarUrl)
    onAddItem(newPerson[newPerson.length - 1]);
    
    // onAddItem(image); // Call the onAddItem function passed as a prop
  };

  return (
    <div>
      <h1 className="">Add an Image:</h1>

      {/* Tabs */}
      <div className="flex mt-2 border-b">
        <button
          className={`w-1/2 py-2 text-sm ${activeTab === "AddNew" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
            }`}
          onClick={() => setActiveTab("AddNew")}
        >
          Add New
        </button>
        <button
          className={`w-1/2 py-2 text-sm ${activeTab === "MyImages" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
            }`}
          onClick={() => setActiveTab("MyImages")}
        >
          My Images
        </button>
      </div>

      {/* Search Bar for My Images */}
      {activeTab === "MyImages" && uploadedImages.length > 0 && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search images..."
            className="w-full border p-2 rounded-md text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Image Upload Box */}
      {activeTab === "AddNew" && (
        <div className="mt-4 flex flex-col items-center border border-gray-300 rounded-lg p-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg hover:bg-gray-100"
          >
            <i className="bi bi-upload text-2xl text-gray-500"></i>
            <span className="text-sm text-blue-500 mt-2">Click to upload</span>
            <span className="text-xs text-gray-500">or drag and drop</span>
            <span className="text-xs text-gray-500">PNG, JPEG, SVG, JPG (Max 10MB).</span>
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />

          {/* Error Message */}
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* My Images Grid */}
      {activeTab === "MyImages" && (
        <div className="p-2 grid grid-cols-3 gap-2 gap-y-4 bg-gray-100 shadow-md rounded-md mt-4">
          {uploadedImages.length > 0 ? (
            filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  alt={image.title}
                  src={image.url}
                  onClick={() => handleSelect(image)} // Select image on click
                  className="aspect-square cursor-pointer rounded-md object-contain hover:shadow-md"
                  title={image.title}
                />
              ))
            ) : (
              <div className="text-gray-500 text-sm text-center col-span-3">No images found.</div>
            )
          ) : (
            <div className="text-gray-500 text-sm text-center col-span-3">No images uploaded yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagePortion;
