"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SlotItemMapArray, Swapy, utils } from "swapy";
import { createSwapy } from "swapy";
import SvgImage from "./SvgImage";
import { deletePerson, getLocalStorageItems } from "../localstorage";

type Item = {
  id: string;
  title: string;
  color: string;
  height: number;
  avatarUrl: string;
};

const initialItems: Item[] = getLocalStorageItems();

function ChartGraph() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    utils.initSlotItemMap(items, "id")
  );
  const swapyRef = useRef<Swapy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeightPx, setContainerHeightPx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // **Find Maximum Height Dynamically**
  const maxHeightCm = Math.max(...items.map((item) => item.height));

  // **Auto-Adjust Zoom Level for Large Heights**
  const adjustedZoomLevel = Math.max(1, Math.min(1000 / maxHeightCm, 2));

  // **Memoized Items**
  const slottedItems = useMemo(
    () => utils.toSlottedItems(items, "id", slotItemMap),
    [items, slotItemMap]
  );

  useEffect(() => {
    utils.dynamicSwapy(swapyRef.current, items, "id", slotItemMap, setSlotItemMap);
  }, [items]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeightPx(containerRef.current.clientHeight);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerHeightPx(entry.contentRect.height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
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

  useEffect(() => {
    setZoomLevel(adjustedZoomLevel);
  }, [maxHeightCm]);
  const handleDelAvatar = (id : string) => {
    setItems(items.filter((i) => i.id !== id))
    deletePerson(id)
  }

  // **Calculate Scaling Factor for Proper Layout**
  const dynamicScaleFactor = containerHeightPx / (maxHeightCm * zoomLevel);
  const personWidthFactor = Math.min(zoomLevel * 0.4, 1); // Maintain proportion

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4 overflow-hidden">
      {/* Zoom Controls */}
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

      {/* Chart Container */}
      <div ref={containerRef} className="relative flex items-end justify-center w-full h-[80vh] bg-white border overflow-hidden">
        {/* Dynamic Ruler/Grid */}
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          {Array.from(
            { length: Math.ceil((maxHeightCm * zoomLevel) / (50 * zoomLevel)) + 1 },
            (_, index) => {
              const cmValue = index * (50 * zoomLevel);
              const ftValue = cmValue / 30.48;
              const position = (cmValue / (maxHeightCm * zoomLevel)) * containerHeightPx;

              return (
                <div
                  key={index}
                  className={`absolute right-0 w-full border-b border-gray-300 flex items-end justify-between px-4`}
                  style={{ bottom: `${position}px` }}
                >
                  <span className="text-xs text-gray-600">{cmValue.toFixed(0)} cm</span>
                  <span className="text-xs text-gray-600">{ftValue.toFixed(1)} ft</span>
                </div>
              );
            }
          )}
        </div>

        {/* Person Items - Adjusted Dynamically */}
        <div className="items relative flex items-end gap-4">
          {slottedItems.map(({ slotId, itemId, item }) => (
            <div key={slotId} className="slot relative flex flex-col items-center" data-swapy-slot={slotId}>
              {item && (
                <div
                  className="items relative flex flex-col items-center"
                  data-swapy-item={itemId}
                  key={itemId}
                >
                  {/* Delete Button */}
                  <div className="flex flex-col absolute bottom-full left-1/2 transform -translate-x-1/2 border-b border-black mb-2">
                    <span className="text-nowrap mb-4">{item.title}</span>
                    <span className="text-nowrap mb-4">{item.height}</span>
                    <button
                      className="text-xs cursor-pointer"
                      onClick={()=>handleDelAvatar(item.id)}
                    >
                      {/* trash-can icon bootstrap icon */}
                      <i className="bi bi-trash text-2xl"></i>
                    </button>
                  </div>

                  {/* Person SVG with Scaled Width & Height */}
                  <SvgImage
                    svgUrl={item.avatarUrl}
                    color={item.color}
                    width={Math.max(30, item.height * personWidthFactor * 0.7)}
                    height={Math.max(50, item.height * dynamicScaleFactor)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChartGraph;
