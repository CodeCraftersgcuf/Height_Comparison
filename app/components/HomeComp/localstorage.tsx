import { v4 as uuidv4 } from "uuid";

export interface Item {
  id: string;
  title: string;
  color: string;
  height: number;
  avatarUrl: string;
}

// Key for localStorage
const STORAGE_KEY = "personList";
const MAX_PERSONS = 5; // 🔥 Limit of 5 persons

/**
 * Get items from localStorage
 */
export const getLocalStorageItems = (): Item[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

/**
 * Save items to localStorage
 */
export const saveToLocalStorage = (items: Item[]) => {
  let data = getLocalStorageItems();
  if (data.length > MAX_PERSONS) {
    console.warn("Cannot add more than 5 persons.");
    return data; // 🔥 Prevent adding more
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

/**
 * Add a new person (🔥 Only if limit is not exceeded)
 */
export const addPerson = (
  title: string,
  color: string,
  height: number,
  avatarUrl: string
) => {
  let items = getLocalStorageItems();

  if (items.length >= MAX_PERSONS) {
    console.warn("Cannot add more than 5 persons.");
    return items; // 🔥 Prevent adding more
  }

  const newPerson: Item = {
    id: uuidv4(),
    title,
    color,
    height,
    avatarUrl,
  };

  const updatedItems = [...items, newPerson];
  saveToLocalStorage(updatedItems);
  return updatedItems;
};

/**
 * Update an existing person
 */
export const updatePerson = (id: string, updatedData: Partial<Item>) => {

  let items = getLocalStorageItems();
  if (items.length >= MAX_PERSONS) {
    console.warn("Cannot add more than 5 persons.");
    return items; // 🔥 Prevent adding more
  }
  items = items.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );

  saveToLocalStorage(items);
  return items;
};

/**
 * Delete a person
 */
export const deletePerson = (id: string) => {
  let items = getLocalStorageItems();
  items = items.filter((item) => item.id !== id);
  saveToLocalStorage(items);
  return items;
};

/**
 * Clear all persons from localStorage
 */
export const clearPersons = () => {
  localStorage.removeItem(STORAGE_KEY);
};
