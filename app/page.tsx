"use client";

import { useState } from "react";
import PersonAddition from "./components/HomeComp/portions/PersonAddition";
import Celebrity from "./components/HomeComp/portions/Celebrity";
import Entity from "./components/HomeComp/portions/Entity";
import ImagePortion from "./components/HomeComp/portions/ImagePortion";
import Selection from "./components/HomeComp/Setection";
import ChartGrapgh from "./components/HomeComp/chart/ChartGrapgh";
import { dummyDescription } from './data';
import Link from "next/link";
import Description from "./components/HomeComp/componets/Description";

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
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-4">
            <h1>Share this tool to your friends: </h1>
            <Link href={'#'} className="bg-blue-500 flex items-center gap-2 p-1 px-4 rounded-md text-white">
              {/* twitter icon below */}
              <i className="bi bi-twitter"></i>
              Twitter
            </Link>
            <Link href={'#'} className="bg-blue-500 flex items-center gap-2 p-1 px-4 rounded-md text-white">
              {/* twitter icon below */}
              <i className="bi bi-facebook"></i>
              Facebook
            </Link>
          </div>
          <div className="my-4">
            <Description description={dummyDescription} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
