import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IuseMovieStore {
  order: string;
  setOrder: (order: string) => void;
}

const useSortStore = create<IuseMovieStore>()(
  persist(
    (set) => ({
      order: "popular",
      setOrder: (order) => set({ order }),
    }),
    {
      name: "movie-sort-storage",
    }
  )
);

export default useSortStore;
