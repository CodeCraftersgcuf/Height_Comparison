import React from "react";

type GenderSelectorProps = {
  gender: "Male" | "Female";
  setGender: (gender: "Male" | "Female") => void;
};

const GenderSelector: React.FC<GenderSelectorProps> = ({ gender, setGender }) => {
  return (
    <div className="flex mt-2 items-center">
      <button
        className={`w-1/2 py-2 rounded-md rounded-r-none ${gender === "Male" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setGender("Male")}
      >
        Male
      </button>
      <button
        className={`w-1/2 py-2 rounded-md rounded-l-none ${gender === "Female" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setGender("Female")}
      >
        Female
      </button>
    </div>
  );
};

export default GenderSelector;
