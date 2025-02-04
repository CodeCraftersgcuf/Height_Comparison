import { v4 as uuidv4 } from "uuid";

export interface Item {
  id: string;
  title: string;
  color: string;
  height: number;
  avatarUrl: string; // New column for avatar image URL
}

// Key for localStorage
const STORAGE_KEY = "personList";

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

/**
 * Add a new person
 */
export const addPerson = (
  title: string,
  color: string,
  height: number,
  avatarUrl: string // New parameter for avatar image
) => {
  const newPerson: Item = {
    id: uuidv4(),
    title,
    color,
    height,
    avatarUrl, // Store avatar URL
  };

  const updatedItems = [...getLocalStorageItems(), newPerson];
  saveToLocalStorage(updatedItems);
  return updatedItems;
};

/**
 * Update an existing person
 */
export const updatePerson = (id: string, updatedData: Partial<Item>) => {
  let items = getLocalStorageItems();
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
