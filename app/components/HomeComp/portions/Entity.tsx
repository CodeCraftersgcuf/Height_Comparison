import Image from "next/image";
import { useState } from "react";
import female from "../../../../public/avatar/female.svg";

type EntityType = {
  name: string;
  url: string;
}[];

const entities: EntityType = [
  { name: "person 1", url: female },
  { name: "person 2", url: female },
  { name: "person 3", url: female },
  { name: "person 4", url: female },
];

const Entity = () => {
  const [filteredEntities, setFilteredEntities] = useState<EntityType>(entities);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchTerm(value);

    if (value.length > 0) {
      const matches = entities.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(value)
      );
      setFilteredEntities(matches);
    } else {
      setFilteredEntities(entities);
    }
  };
  const handleSelect = (entity : object)=>{
    console.log("selected entity : " , entity)
  }

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
            alt={entity.name}
            src={entity.url}
            onClick={()=>handleSelect(entity)}
            className="aspect-square cursor-pointer rounded-md object-contain hover:shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Entity;
