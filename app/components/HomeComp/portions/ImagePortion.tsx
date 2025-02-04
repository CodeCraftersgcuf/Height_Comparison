"use client";

import React, { useState } from "react";
import Image from "next/image";

const ImagePortion = () => {
  const [activeTab, setActiveTab] = useState<"AddNew" | "MyImages">("AddNew");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    reader.onload = (e) => setSelectedImage(e.target?.result as string);
    reader.readAsDataURL(file);
    console.log(selectedImage);
  };

  return (
    <div className="">
      <h3 className="text-xs font-semibold flex items-center gap-1">
        Add your own image
        {/* <i className="bi bi-question-circle text-gray-500 cursor-pointer"></i> */}
      </h3>

      {/* Tabs */}
      <div className="flex mt-2 border-b">
        <button
          className={`w-1/2 py-2 text-sm ${
            activeTab === "AddNew" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("AddNew")}
        >
          Add new
        </button>
        <button
          className={`w-1/2 py-2 text-sm ${
            activeTab === "MyImages" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("MyImages")}
        >
          My images
        </button>
      </div>

      {/* Image Upload Box */}
      {activeTab === "AddNew" && (
        <div className="mt-4 flex flex-col items-center border border-gray-300 rounded-lg p-4">
          {/* Upload Box */}
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg hover:bg-gray-100"
          >
            {selectedImage ? (
              <Image src={selectedImage} alt="Uploaded Image" width={100} height={100} className="rounded-md object-contain aspect-square" />
            ) : (
              <>
                <i className="bi bi-upload text-2xl text-gray-500"></i>
                <span className="text-sm text-blue-500 mt-2">Click to upload</span>
                <span className="text-xs text-gray-500">or drag and drop</span>
                <span className="text-xs text-gray-500">PNG, JPEG, SVG, JPG (Max 10MB).</span>
              </>
            )}
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />

          {/* Error Message */}
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* My Images Tab */}
      {activeTab === "MyImages" && (
        <div className="mt-4 flex flex-col items-center text-gray-500 text-sm">
          No images found.
        </div>
      )}
    </div>
  );
};

export default ImagePortion;
