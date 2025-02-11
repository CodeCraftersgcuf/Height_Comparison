"use client";

import { useState, useEffect } from "react";
import PersonAddition from "./components/HomeComp/portions/PersonAddition";
import Celebrity from "./components/HomeComp/portions/Celebrity";
import Entity from "./components/HomeComp/portions/Entity";
import ImagePortion from "./components/HomeComp/portions/ImagePortion";
import Selection from "./components/HomeComp/Setection";
import ChartGraph from "./components/HomeComp/chart/ChartGrapgh";
import { dummyDescription } from './data';
import Link from "next/link";
import Description from "./components/HomeComp/componets/Description";
import { getLocalStorageItems, saveToLocalStorage } from "./components/HomeComp/localstorage";

const MAX_PERSONS = 5; // 🔥 Limit of 5 persons

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<string>("addition");
  const [dataItems, setDataItems] = useState(getLocalStorageItems());

  // Sync Data with Local Storage
  useEffect(() => {
    const syncData = () => setDataItems(getLocalStorageItems());
    window.addEventListener("storage", syncData);

    return () => {
      window.removeEventListener("storage", syncData);
    };
  }, []);

  useEffect(() => {
    setDataItems(getLocalStorageItems());
  }, []);

  console.log("from home:", dataItems);

  const selectionOptions = [
    { icon: "bi bi-person-add", value: "addition", name: "Add Person" },
    { icon: "bi bi-star", value: "celebrities", name: "Celebrities" },
    { icon: "bi bi-box", value: "entities", name: "Entities" },
    { icon: "bi bi-images", value: "upload_img", name: "Add Image" },
  ];

  // Function to update DataItems dynamically with limit check
  const handleAddItem = (newItem: any) => {
    if (dataItems.length >= MAX_PERSONS) {
      console.warn("Cannot add more than 5 persons.");
      return;
    }

    const updatedItems = [...dataItems, newItem];
    setDataItems(updatedItems);
    saveToLocalStorage(updatedItems);
  };

  const handleDelAvatar = (id: string) => {
    console.log("deleted confirm");
    const updatedItems = dataItems.filter((item) => item.id !== id);
    setDataItems(updatedItems);
    saveToLocalStorage(dataItems);
    console.log("after deleting : ",dataItems);
  };

  const handleOptions = (value: string) => {
    setSelectedTab(value);
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case "addition":
        return <PersonAddition onAddItem={handleAddItem} />;
      case "celebrities":
        return <Celebrity onAddItem={handleAddItem} />;
      case "entities":
        return <Entity onAddItem={handleAddItem} />;
      case "upload_img":
        return <ImagePortion onAddItem={handleAddItem} />;
      default:
        return <PersonAddition onAddItem={handleAddItem} />;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center mb-12">
        <div className="order-2 md:order-1 border md:w-fit">
          <Selection
            tabs={selectionOptions}
            activeTab={selectedTab}
            handleValue={handleOptions}
          />
        </div>
        <div className="order-3 md:order-2 p-4 border min-w-[300px] md:w-64 w-full">
          {renderComponent()}
        </div>
        <div className="order-1 md:order-3 w-full">
          <ChartGraph Dataitems={dataItems} onDeleteItem={handleDelAvatar} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 container mx-auto">
        <div className="flex items-center gap-4">
          <h1>Share this tool with your friends: </h1>
          <Link href={'#'} className="bg-blue-500 flex items-center gap-2 p-1 px-4 rounded-md text-white">
            <i className="bi bi-twitter"></i> Twitter
          </Link>
          <Link href={'#'} className="bg-blue-500 flex items-center gap-2 p-1 px-4 rounded-md text-white">
            <i className="bi bi-facebook"></i> Facebook
          </Link>
        </div>
        <div className="my-4">
          <Description description={dummyDescription} />
        </div>
      </div>
    </div>
  );
};

export default Page;
