import { useEffect, useMemo, useRef, useState } from 'react';
import { SlotItemMapArray, Swapy, utils } from 'swapy';
import { createSwapy } from 'swapy';
import SwagyWoman from './SwagyWoman';

type Item = {
  id: string;
  title: string;
  color:string;
  height:number
};

const initialItems: Item[] = [
  { id: '1', title: '1',color:'red',height:100 },
  { id: '2', title: '2',color:'yellow',height:200 },
  { id: '3', title: '3',color:'blue',height:300 },
];

let id = 4;

function ChartGrapgh() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(items, 'id'));
  const slottedItems = useMemo(() => utils.toSlottedItems(items, 'id', slotItemMap), [items, slotItemMap]);
  const swapyRef = useRef<Swapy | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => utils.dynamicSwapy(swapyRef.current, items, 'id', slotItemMap, setSlotItemMap), [items]);

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

  return (
    <div className="container flex items-end justify-center h-[88vh]" ref={containerRef}>
      <div className="items flex items-end">
        {slottedItems.map(({ slotId, itemId, item }) => (
          <div className="slot cursor-pointer h-fit" key={slotId} data-swapy-slot={slotId}>
            {item && (
              <div className="item relative" data-swapy-item={itemId} key={itemId}>
                <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 border-b border-black mb-2'>
                  <span
                    className="delete"
                    data-swapy-no-drag
                    onClick={() => {
                      setItems(items.filter((i) => i.id !== item.id));
                    }}
                  >del</span>
                </div>
                <SwagyWoman color={item.color} height={item.height}/>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="item item--add"
        onClick={() => {
          const newItem: Item = { id: `${id}`, title: `${id}`,color : `${id}`,height:id };
          setItems([...items, newItem]);
          id++;
        }}
      >
        +
      </div>
    </div>
  );
}

export default ChartGrapgh;