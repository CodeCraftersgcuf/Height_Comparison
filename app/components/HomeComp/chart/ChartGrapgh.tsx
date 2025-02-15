"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SlotItemMapArray, Swapy, utils } from "swapy";
import { createSwapy } from "swapy";
import SvgImage from "./SvgImage";
import { saveToLocalStorage } from "../localstorage";

type Item = {
  id: string;
  title: string;
  color: string;
  height: number;
  avatarUrl: string;
};

interface ChartGraphProps {
  Dataitems: Item[];
  onDeleteItem: (id: string) => void;
}

const ChartGraph: React.FC<ChartGraphProps> = ({ Dataitems, onDeleteItem }) => {
  const [items, setItems] = useState<Item[]>(Dataitems);
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    utils.initSlotItemMap(items, "id")
  );

  const swapyRef = useRef<Swapy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeightPx, setContainerHeightPx] = useState(600);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setItems(Dataitems.slice(0, 5)); // Ensure only 5 persons are displayed
  }, [Dataitems]);

  useEffect(() => {
    saveToLocalStorage(items);
  }, [items]);

  useEffect(() => {
    utils.dynamicSwapy(swapyRef.current, items, "id", slotItemMap, setSlotItemMap);
  }, [items]);

  const slottedItems = useMemo(
    () => utils.toSlottedItems(items, "id", slotItemMap),
    [items, slotItemMap]
  );

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeightPx(containerRef.current.clientHeight);
    }
  }, [items]);

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
    });

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray);
    });

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  const handleDelAvatar = (id: string) => {
    onDeleteItem(id);
  };

  const maxHeightCm = Math.max(...items.map((item) => item.height), 200);

  /** Scale Down logic when more than 5 entities exist */
  const entityCount = items.length;
  const scaleFactor = entityCount > 5 ? 5 / entityCount : 1;

  // const adjustedZoomLevel = Math.max(1, Math.min(1000 / maxHeightCm, 2)) * scaleFactor;
  let autoZoom = Math.max(1, Math.min(1000 / maxHeightCm, 2)) * scaleFactor;

  if (maxHeightCm > 3000) { autoZoom = 2; }
  console.log("autozoom : ", autoZoom);
  useEffect(() => {
    setZoomLevel(autoZoom);
  }, [maxHeightCm, entityCount]);

  function getDynamicGap(heightCm: number): number {
    const gapValues = [
      { max: 1_000_000_000, gap: 100_000_000 }, // 1 billion cm (10,000 km)
      { max: 100_000_000, gap: 10_000_000 },    // 100 million cm (1,000 km)
      { max: 10_000_000, gap: 1_000_000 },      // 10 million cm (100 km)
      { max: 1_000_000, gap: 100_000 },         // 1 million cm (10 km)
      { max: 100_000, gap: 10_000 },            // 100,000 cm (1 km)
      { max: 10_000, gap: 1_000 },              // 10,000 cm (100 m)
      { max: 5_000, gap: 500 },                 // 5,000 cm (50 m)
      { max: 800, gap: 200 },                   // 800 cm (8 m)
      { max: 600, gap: 100 },                   // 600 cm (6 m)
      { max: 400, gap: 20 },
      { max: 300, gap: 50 },
    ];

    for (const { max, gap } of gapValues) {
      if (heightCm >= max) return gap; // Change `>` to `>=` to match exact values
    }

    return 10; // Default minimum gap of 10 cm for very small heights
  }



  /** Scale both Ruler and Figures proportionally */
  const dynamicScaleFactor = (containerHeightPx / (maxHeightCm * zoomLevel * scaleFactor)) * scaleFactor;
  const personWidthFactor = Math.min(zoomLevel * 0.4, 1) * scaleFactor;
  // console.log('Scale Factor:', scaleFactor, 'Entity Count:', entityCount, 'Adjusted Zoom Level:', adjustedZoomLevel)

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4 overflow-hidden">
      <div className="absolute top-2 right-2 flex space-x-2 bg-white p-2 shadow-md rounded z-50">
        <button
          onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span className="text-sm font-semibold">{(zoomLevel * 100).toFixed(0)}%</span>
        <button
          onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 2))}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative flex items-end justify-center w-full h-[80vh] bg-white border max-w-4xl overflow-y-auto overflow-x-hidden"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          {Array.from(
            {
              length: Math.ceil((maxHeightCm * zoomLevel) / getDynamicGap(maxHeightCm)) + 1,
            },
            (_, index) => {
              const cmValue = index * getDynamicGap(maxHeightCm);
              const ftValue = cmValue / 30.48;
              const position = (cmValue / (maxHeightCm * zoomLevel)) * containerHeightPx * scaleFactor;
              return (
                <div
                  key={index}
                  className="absolute right-0 w-full border-b border-gray-300 flex items-end justify-between px-4 pr-8"
                  style={{ bottom: `${position}px` }}
                >
                  <span className="text-xs text-gray-600">{Math.round(cmValue)} cm</span>
                  <span className="text-xs text-gray-600">{ftValue.toFixed(1)} ft </span>
                </div>
              );
            }
          )}
        </div>

        <div className="items relative flex items-end justify-center gap-4 max-w-full overflow-x-auto overflow-y-scroll w-full h-[80vh] px-[100px] pt-[200px]"
          // style={{ scale: scaleFactor }}
        >
          {slottedItems.map(({ slotId, itemId, item }) => (
            <div key={slotId} className="slot relative flex flex-col items-center" data-swapy-slot={slotId}>
              {item && item.avatarUrl && (
                <div
                  className="items relative flex flex-col items-center"
                  data-swapy-item={itemId}
                  key={itemId}
                >
                  {/* Delete Button */}
                  <div className="flex flex-col items-center absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                    <span className="text-nowrap text-center">{item.title}</span>
                    <span className="text-nowrap mb-4 text-center">{Math.round(item.height)} cm</span>
                    {/* <span className="text-nowrap mb-4 text-center">{Math.round(Math.max(50, item.height * dynamicScaleFactor * scaleFactor))} cm</span> */}
                    <button
                      className="text-xs cursor-pointer border-b border-black w-fit"
                      onClick={() => handleDelAvatar(item.id)}
                    >
                      <i className="bi bi-trash text-2xl"></i>
                    </button>
                  </div>

                  {/* Person SVG with Scaled Width & Height */}
                  <SvgImage
                    svgUrl={item.avatarUrl}
                    color={item.color}
                    height={Math.max(50, item.height * dynamicScaleFactor * scaleFactor)}
                  />
                </div>
              )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartGraph;
