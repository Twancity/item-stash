import { useCallback, useEffect, useState } from "react";

export type StashItem = {
  id: string;
  name: string;
  room: string;
  location: string;
  notes?: string;
};

const STORAGE_KEY = "stash.items.v1";

export const SAMPLE_ITEMS: StashItem[] = [
  {
    id: "sample-christmas-lights",
    name: "Christmas Lights",
    room: "Garage",
    location: "Left Shelf → Blue Bin",
    notes: "Outdoor lights and extension cords",
  },
  {
    id: "sample-drill-bits",
    name: "Drill Bits",
    room: "Garage",
    location: "Workbench → Second Drawer",
  },
  {
    id: "sample-hdmi-cables",
    name: "HDMI Cables",
    room: "Office",
    location: "Closet → Black Storage Bin",
  },
];

function read(): StashItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ITEMS));
      return SAMPLE_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StashItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: StashItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("stash:changed"));
}

export function useStash() {
  const [items, setItems] = useState<StashItem[] | null>(null);

  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    window.addEventListener("stash:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("stash:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addItem = useCallback((item: Omit<StashItem, "id">) => {
    const next = [{ ...item, id: crypto.randomUUID() }, ...read()];
    write(next);
  }, []);

  const updateItem = useCallback((id: string, patch: Omit<StashItem, "id">) => {
    write(read().map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    write(read().filter((i) => i.id !== id));
  }, []);

  return { items, loading: items === null, addItem, updateItem, deleteItem };
}
