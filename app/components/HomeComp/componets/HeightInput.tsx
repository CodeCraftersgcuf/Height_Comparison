import React from "react";

type HeightInputProps = {
  heightType: "ft" | "cm";
  setHeightType: (type: "ft" | "cm") => void;
  heightFt: string;
  setHeightFt: (value: string) => void;
  heightInch: string;
  setHeightInch: (value: string) => void;
  heightCm: string;
  setHeightCm: (value: string) => void;
};

const HeightInput: React.FC<HeightInputProps> = ({
  heightType, setHeightType, heightFt, setHeightFt, heightInch, setHeightInch, heightCm, setHeightCm
}) => {
  return (
    <>
      <div className="flex mt-2 rounded-md items-center overflow-hidden border">
        <span className="bg-gray-200 block p-2 text-sm">Height</span>
        <div className="flex items-center w-full overflow-hidden">
          <button className={`w-full p-2 text-sm ${heightType === "ft" ? "bg-blue-300" : ""}`} onClick={() => setHeightType("ft")}>
            ft
          </button>
          <button className={`w-full p-2 text-sm ${heightType === "cm" ? "bg-blue-300" : ""}`} onClick={() => setHeightType("cm")}>
            cm
          </button>
        </div>
      </div>

      {heightType === "ft" ? (
        <div className="flex mt-2 space-x-2">
          <input type="number" placeholder="ft" className="w-1/2 border p-2 rounded-md text-center text-sm" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
          <input type="number" placeholder="inch" className="w-1/2 border p-2 rounded-md text-center text-sm" value={heightInch} onChange={(e) => setHeightInch(e.target.value)} />
        </div>
      ) : (
        <input type="number" placeholder="cm" className="w-full border p-2 rounded-md text-center text-sm mt-2" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
      )}
    </>
  );
};

export default HeightInput;
