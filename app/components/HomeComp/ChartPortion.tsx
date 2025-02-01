"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import avatar from "../../../public/avatar/man.png";
import { motion } from "framer-motion";

type Item = {
    id: number;
    name: string;
    heightCm: number;
    width: number;
    x: number;
    y: number;
    color: string;
};

const ChartPortion = () => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [items, setItems] = useState<Item[]>([
        { id: 1, name: "Hamza Bilal", heightCm: 175, width: 80, x: 300, y: 400, color: "red" },
        { id: 2, name: "Random Person", heightCm: 127, width: 60, x: 100, y: 400, color: "blue" },
    ]);

    const addNewPerson = () => {
        setItems((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                name: `Person ${prev.length + 1}`,
                heightCm: Math.floor(Math.random() * 200) + 100,
                width: 60,
                x: Math.floor(Math.random() * 400),
                y: 400,
                color: "yellow",
            },
        ]);
    };

    // Convert cm to feet
    const cmToFeet = (cm: number) => {
        const feet = cm / 30.48;
        return feet.toFixed(2);
    };

    return (
        <div className="bg-gray-100 p-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold">Height Comparison Tool</h2>

            {/* Zoom Slider */}
            <div className="flex items-center gap-2 my-4">
                <label className="text-sm">Zoom:</label>
                <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    className="w-40"
                />
            </div>

            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                onClick={addNewPerson}
            >
                Add New Person
            </button>

            <TransformWrapper>
                <TransformComponent>
                    <div className="relative w-full min-w-[500px] max-w-[90%] lg:max-w-[1200px] h-[500px] bg-white border mt-4 flex">

                        {/* Left-side cm labels */}
                        <div className="w-16 flex flex-col justify-between items-center border-r bg-gray-50 text-sm">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-[10%]">{(255 - i * 25)} cm</div>
                            ))}
                        </div>

                        {/* Main comparison area */}
                        <div className="flex-1 relative">
                            {items.map((item, index) => (
                                <Rnd
                                    key={item.id}
                                    default={{ x: item.x, y: item.y, width: item.width, height: item.heightCm }}
                                    bounds="parent"
                                    enableResizing={{ top: false, bottom: true, left: true, right: true }}
                                    minWidth={50}
                                    minHeight={50}
                                    dragAxis="x"
                                    onResizeStop={(e, direction, ref, delta, position) => {
                                        setItems((prevItems) =>
                                            prevItems.map((el) =>
                                                el.id === item.id
                                                    ? {
                                                          ...el,
                                                          width: parseFloat(ref.style.width),
                                                          heightCm: parseFloat(ref.style.height),
                                                          x: position.x,
                                                          y: 400,
                                                      }
                                                    : el
                                            )
                                        );
                                    }}
                                    onDragStop={(e, data) => {
                                        setItems((prevItems) =>
                                            prevItems.map((el) =>
                                                el.id === item.id ? { ...el, x: data.x, y: 400 } : el
                                            )
                                        );

                                        // Push adjacent elements to prevent overlap
                                        setItems((prevItems) => {
                                            return prevItems.map((el, idx) => {
                                                if (idx !== index && Math.abs(el.x - data.x) < 80) {
                                                    return { ...el, x: el.x + (data.x > el.x ? 80 : -80) };
                                                }
                                                return el;
                                            });
                                        });
                                    }}
                                    className="absolute flex flex-col items-center justify-end overflow-visible"
                                >
                                    {/* Smooth Dragging Effect */}
                                    <motion.div
                                        className="relative w-full h-full flex items-end justify-center"
                                        animate={{ x: 0, y: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        style={{
                                            backgroundColor: item.color,
                                            WebkitMaskImage: `url(${avatar.src})`,
                                            maskImage: `url(${avatar.src})`,
                                            WebkitMaskSize: "contain",
                                            maskSize: "contain",
                                            WebkitMaskRepeat: "no-repeat",
                                            maskRepeat: "no-repeat",
                                            WebkitMaskPosition: "bottom",
                                            maskPosition: "bottom",
                                            aspectRatio: "1/3",
                                        }}
                                    >

                                        {/* Text content */}
                                        <div className="absolute bottom-0 text-center text-black text-sm">
                                            {item.name} <br />
                                            {item.heightCm} cm <br />
                                            ft: {cmToFeet(item.heightCm)}
                                        </div>
                                    </motion.div>
                                </Rnd>
                            ))}
                        </div>

                        {/* Right-side ft labels */}
                        <div className="w-16 flex flex-col justify-between items-center border-l bg-gray-50 text-sm">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-[10%]">{(255 - i * 25) / 30.48} ft</div>
                            ))}
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default ChartPortion;
