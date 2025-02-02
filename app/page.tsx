"use client";

import { useState } from "react";
import PersonAddition from "./components/HomeComp/portions/PersonAddition";
import Celebrity from "./components/HomeComp/portions/Celebrity";
import Entity from "./components/HomeComp/portions/Entity";
import ImagePortion from "./components/HomeComp/portions/ImagePortion";
import Selection from "./components/HomeComp/Setection";
import ChartGrapgh from "./components/HomeComp/chart/ChartGrapgh";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<string>("addition");

  const selectionOptions = [
    { icon: "bi bi-person-add", value: "addition", name: "Add Person" },
    { icon: "bi bi-star", value: "celebrities", name: "Celebrities" },
    { icon: "bi bi-box", value: "entities", name: "Entities" },
    { icon: "bi bi-images", value: "upload_img", name: "Add Image" },
  ];

  const handleOptions = (value: string) => {
    setSelectedTab(value);
  };

  // Render the selected component based on `selectedTab`
  const renderComponent = () => {
    switch (selectedTab) {
      case "addition":
        return <PersonAddition />;
      case "celebrities":
        return <Celebrity />;
      case "entities":
        return <Entity />;
      case "upload_img":
        return <ImagePortion />;
      default:
        return <PersonAddition />; // Fallback
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="border w-fit">
        <Selection
          tabs={selectionOptions}
          activeTab={selectedTab}
          handleValue={handleOptions}
        />
      </div>
      <div className="p-4 border min-w-[300px]">{renderComponent()}</div>
      <div className="w-full">
        <ChartGrapgh/>
      </div>
    </div>
  );
};

export default Home;
