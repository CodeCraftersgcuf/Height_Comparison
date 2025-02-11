"use client"
import React, { useState } from "react";

const HeightConverter: React.FC = () => {
  const [cm, setCm] = useState<string>("");
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // Convert CM to Feet and Inches
  const convertToUS = () => {
    if (!cm) return;
    const totalInches = parseFloat(cm) / 2.54;
    const feetPart = Math.floor(totalInches / 12);
    const inchesPart = (totalInches % 12).toFixed(2);
    setFeet(feetPart.toString());
    setInches(inchesPart);
    setResult(`${feetPart} ft ${inchesPart} inch`);
    setCm("");
  };

  // Convert Feet and Inches to CM
  const convertToMetric = () => {
    if (!feet && !inches) return;
    const totalInches = parseInt(feet || "0") * 12 + parseFloat(inches || "0");
    const cmValue = (totalInches * 2.54).toFixed(2);
    setCm(cmValue);
    setResult(`${cmValue} cm`);
    setFeet("");
    setInches("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Height Converter</h2>

      {/* Metric to US Converter */}
      <div className="bg-gray-100 p-4 rounded mb-4 max-w-md">
        <h3 className="mb-2">Metric to US Converter</h3>
        <div className="flex items-center mb-2">
          <input
            type="number"
            value={cm}
            onChange={(e) => setCm(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter cm"
          />
          <span className="ml-2">cm</span>
        </div>
        <button onClick={convertToUS} className="bg-blue-600 text-white px-4 py-2 rounded">
          Convert to US Unit
        </button>
      </div>

      {/* US to Metric Converter */}
      <div className="bg-gray-100 p-4 rounded max-w-md">
        <h3 className="mb-2">US unit to Metric Converter</h3>
        <div className="flex items-center mb-2">
          <input
            type="number"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
            className="border p-2 w-1/2"
            placeholder="Feet"
          />
          <span className="mx-2">ft</span>
          <input
            type="number"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
            className="border p-2 w-1/2"
            placeholder="Inches"
          />
          <span className="ml-2">inch</span>
        </div>
        <button onClick={convertToMetric} className="bg-blue-600 text-white px-4 py-2 rounded">
          Convert to Metric Unit
        </button>
      </div>

      <div className="my-8 h-[1px] bg-gray-500" ></div>
      {/* Result Display */}
      <div className="ans-can mt-4 p-4">
        <h3 className="font-semibold text-4xl">Converted Result</h3>
        <p className="text-lg">{result}</p>
      </div>
    </div>
  );
};

export default HeightConverter;
