import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { addPerson } from "../localstorage";

// Fetch entities from API
const fetchEntities = async () => {
  const response = await axios.get("http://localhost:8000/api/entities");
  console.log("API Response:", response.data); // Debugging log
  return response.data.entities || []; // Extract entities array
};

type EntityType = {
  E_id: string;
  name: string; // Rename from "title" to "name"
  link: string;
  parameters:JSON; //
};

type EntityProps = {
  onAddItem: (newItem: EntityType) => void;
};

const Entity = ({ onAddItem }: EntityProps) => {
  const { data: entities = [], error, isLoading } = useQuery({
    queryKey: ["entities"],
    queryFn: fetchEntities,
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Fetched entities:", entities);
  }, [entities]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim().toLowerCase());
  };

  const filteredEntities = entities.filter((entity: EntityType) =>
    entity.name.toLowerCase().includes(searchTerm)
  );

  const handleSelect = (entity: EntityType) => {
    const data =JSON.parse(entity.parameters);
    const heightObject = data.find(item => item.parameter.name === "height");
    
    // Get the value of height
    const heightValue = heightObject ? heightObject.value : null;

    console.log(heightValue);  // Output: "2100"
    const newPerson = addPerson(entity.name, "defaultColor", heightValue, entity.link);
    onAddItem(newPerson[newPerson.length - 1] as EntityType);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching entities:", error);
    return <p className="text-red-500">Failed to load data.</p>;
  }

  return (
    <div>
      <h1>Add an entity:</h1>
      <div>
        <input
          type="text"
          placeholder="eg: Johnny Depp, Naruto"
          className="w-full border p-2 rounded-md text-sm outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="p-2 grid grid-cols-3 gap-2 gap-y-4 bg-gray-100 max-h-[300px] overflow-auto shadow-md rounded-md mt-4">
        {filteredEntities.map((entity: EntityType, index: number) => (
          <Image
            key={index}
            width={100}
            height={100}
            alt={entity.name}
            src={entity.link}
            onClick={() => handleSelect(entity)}
            className="aspect-square cursor-pointer rounded-md object-contain hover:shadow-md"
            title={entity.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Entity;
