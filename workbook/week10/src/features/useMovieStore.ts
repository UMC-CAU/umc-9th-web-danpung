import { create } from "zustand";
import { persist } from "zustand/middleware";
interface StoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  includeAdult: boolean;
  toggleIncludeAdult: () => void;

  isSearching: boolean;
  startSearch: () => void;
  stopSearch: () => void;

  language: string;
  setLanguage: (lang: string) => void;
}

const useMovieStore = create<StoreState>()(
  persist(
    (set) => ({
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }), // 검색어

      includeAdult: false,
      toggleIncludeAdult: () =>
        set((state) => ({ includeAdult: !state.includeAdult })), // 성인 콘텐츠 포함 여부

      isSearching: false,
      startSearch: () => set({ isSearching: true }),
      stopSearch: () => set({ isSearching: false }), // 검색 상태

      language: "en",
      setLanguage: (lang) => set({ language: lang }), //언어 설정
    }),
    {
      name: "movie-store",
    }
  )
);

export default useMovieStore;
