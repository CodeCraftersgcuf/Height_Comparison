import { useState } from "react";
import { SketchPicker } from "react-color";

type ColorPickerProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, setSelectedColor }) => {
  const colors = ["#ff9800", "#ff5722", "#f44336", "#9c27b0", "#3f51b5", "#009688"];
  const [showColorPicker, setshowColorPicker] = useState(false)

  return (
    <div>
      <h1 className="mt-3 text-xs mb-3">Color Selection</h1>
      {selectedColor && <div className="w-10 h-10 mt-3 rounded-md mb-3" style={{backgroundColor:selectedColor,}}></div>}
      <hr />
      <div className="flex mt-3 space-x-1 mb-3">
        {colors.map((color) => (
          <div
            key={color}
            className="w-6 h-6 rounded-full cursor-pointer"
            style={{ backgroundColor: color, border: selectedColor === color ? "2px solid black" : "none" }}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))}
        {/* Color Picker Button */}
        <button
          onClick={() => setshowColorPicker(!showColorPicker)}
          className="w-6 h-6 border rounded-full flex items-center justify-center p-1"
        >
          <i className="bi bi-brush-fill"></i>
        </button>
      </div>
      {/* Color Picker Popup */}
      {showColorPicker && (
        <div className="mt-2 z-10 mb-3" onMouseLeave={() => setshowColorPicker(false)}>
          <SketchPicker color={selectedColor} onChange={(color) => setSelectedColor(color.hex)} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
