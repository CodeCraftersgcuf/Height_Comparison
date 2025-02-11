import Image from "next/image";
import { useState } from "react";
import female from "../../../../public/avatar/female.svg";
import male from "../../../../public/avatar/male.svg";
import { addPerson } from "../localstorage";

type EntityType = {
  title: string;
  avatarUrl: string;
  color: string;
  height: number;
};

type EntityProps = {
  onAddItem: (newItem: { title: string; color: string; height: number; avatarUrl: string }) => void;
};

const entities: EntityType[] = [
  { title: "Tom Cruise", color: "#2ECC71", height: 170, avatarUrl: female.src },
  { title: "Leonardo DiCaprio", color: "#3498DB", height: 183, avatarUrl: male.src },
  { title: "hello world", color: "#3498DB", height: 100000, avatarUrl: "https://cdn-v2.heightcomparison.com/modules/avatars/application/YZye5rrdEDz8mKL41IMbj__The_White_House.svg" },
  { title: "car", color: "#3498DB", height: 198, avatarUrl: "https://cdn-v2.heightcomparison.com/modules/avatars/application/8GgoAcY9lpTNhlqOvyT0h__Car.svg" },
];

const Entity = ({ onAddItem }: EntityProps) => {
  const [filteredEntities, setFilteredEntities] = useState<EntityType[]>(entities);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchTerm(value);

    if (value.length > 0) {
      const matches = entities.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(value)
      );
      setFilteredEntities(matches);
    } else {
      setFilteredEntities(entities);
    }
  };

  const handleSelect = (entity: EntityType) => {
    const newPerson = addPerson(entity.title, entity.color, entity.height, entity.avatarUrl);
    onAddItem(newPerson[newPerson.length - 1]);
    // onAddItem(newItem); // Add the selected item using the passed handler
  };

  return (
    <div>
      <h1 className="">Add an entity:</h1>
      <div>
        <input
          type="text"
          placeholder="eg: Johnny Depp, Naruto"
          className="w-full border p-2 rounded-md text-sm outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="p-2 grid grid-cols-3 gap-2 gap-y-4 bg-gray-100 shadow-md rounded-md mt-4">
        {filteredEntities.map((entity, index) => (
          <Image
            key={index}
            width={100}
            height={100}
            alt={entity.title}
            src={entity.avatarUrl}
            onClick={() => handleSelect(entity)} // Select the entity
            className="aspect-square cursor-pointer rounded-md object-contain hover:shadow-md"
            title={entity.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Entity;
