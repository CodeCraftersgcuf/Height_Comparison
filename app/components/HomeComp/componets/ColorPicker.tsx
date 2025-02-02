import React from "react";

type ColorPickerProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, setSelectedColor }) => {
  const colors = ["#ff9800", "#ff5722", "#f44336", "#9c27b0", "#3f51b5", "#009688"];

  return (
    <div className="flex mt-3 space-x-1">
      {colors.map((color) => (
        <div key={color} className="w-6 h-6 rounded-full cursor-pointer" style={{ backgroundColor: color, border: selectedColor === color ? "2px solid black" : "none" }} onClick={() => setSelectedColor(color)}></div>
      ))}
    </div>
  );
};

export default ColorPicker;
