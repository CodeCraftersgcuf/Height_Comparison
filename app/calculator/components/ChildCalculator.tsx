"use client"
import React, { useState } from "react";
import male from '../../../public/avatar/male.svg'
import female from '../../../public/avatar/female.svg'
import ChartGraph from "@/app/components/HomeComp/chart/ChartGrapgh";


const ChildCalculator: React.FC = () => {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [childFeet, setChildFeet] = useState<string>("");
  const [childInches, setChildInches] = useState<string>("");
  const [childWeight, setChildWeight] = useState<string>("");
  const [motherFeet, setMotherFeet] = useState<string>("");
  const [motherInches, setMotherInches] = useState<string>("");
  const [fatherFeet, setFatherFeet] = useState<string>("");
  const [fatherInches, setFatherInches] = useState<string>("");
  const [result, setResult] = useState<null | object[]>(null);

  const calculateHeight = () => {
    const childHeight = parseInt(childFeet) * 12 + parseFloat(childInches);
    const motherHeight = parseInt(motherFeet) * 12 + parseFloat(motherInches);
    const fatherHeight = parseInt(fatherFeet) * 12 + parseFloat(fatherInches);

    const predictedHeight =
      gender === "Male"
        ? (motherHeight * 0.923 + fatherHeight) / 2 + 2.5
        : (motherHeight + fatherHeight * 0.923) / 2 - 2.5;

    setResult([
      {
        id: '1',
        title: "Father",
        height: (fatherHeight * 2.54).toFixed(2),
        heightInCm: (fatherHeight * 2.54).toFixed(2),
        avatarUrl: male.src
      },
      {
        id:'2',
        title: "Mother",
        height: (motherHeight * 2.54).toFixed(2),
        heightInCm: (motherHeight * 2.54).toFixed(2),
        avatarUrl: female.src
      },
      {
        id:'3',
        title: "Child",
        age,
        gender,
        height: (predictedHeight * 2.54).toFixed(2),
        heightInCm: (predictedHeight * 2.54).toFixed(2),
        avatarUrl: male.src
      },
    ]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Height Calculator</h2>
      <div className="bg-gray-100 p-4 rounded mb-4 max-w-lg">
        <label>Child's Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 w-full"
        />

        <label>Gender:</label>
        <div className="flex gap-2">
          <button
            className={`p-2 ${gender === "Male" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setGender("Male")}
          >
            Male
          </button>
          <button
            className={`p-2 ${gender === "Female" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setGender("Female")}
          >
            Female
          </button>
        </div>

        <label>Child's Height:</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={childFeet}
            onChange={(e) => setChildFeet(e.target.value)}
            className="border p-2"
            placeholder="Feet"
          />
          <span className="text-lg">ft</span>
          <input
            type="number"
            value={childInches}
            onChange={(e) => setChildInches(e.target.value)}
            className="border p-2"
            placeholder="Inches"
          />
          <span className="text-lg">cm</span>
        </div>

        <label>Child's Weight (lbs):</label>
        <input
          type="number"
          value={childWeight}
          onChange={(e) => setChildWeight(e.target.value)}
          className="border p-2 w-full"
        />

        <label>Mother's Height:</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={motherFeet}
            onChange={(e) => setMotherFeet(e.target.value)}
            className="border p-2"
            placeholder="Feet"
          />
          <span className="text-lg">ft</span>
          <input
            type="number"
            value={motherInches}
            onChange={(e) => setMotherInches(e.target.value)}
            className="border p-2"
            placeholder="Inches"
          />
          <span className="text-lg">cm</span>
        </div>

        <label>Father's Height:</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={fatherFeet}
            onChange={(e) => setFatherFeet(e.target.value)}
            className="border p-2"
            placeholder="Feet"
          />
          <span className="text-lg">ft</span>
          <input
            type="number"
            value={fatherInches}
            onChange={(e) => setFatherInches(e.target.value)}
            className="border p-2"
            placeholder="Inches"
          />
          <span className="text-lg">cm</span>
        </div>
      </div>

      <button onClick={calculateHeight} className="bg-blue-600 text-white px-4 py-2 rounded">Calculate</button>

      {result && (
        <>
          {/* <div className="mt-4 bg-gray-200 p-4 rounded">
            <h3 className="font-semibold">Predicted Heights</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div> */}
          <ChartGraph Dataitems={result} />
        </>
      )}
    </div>
  );
};

export default ChildCalculator;
