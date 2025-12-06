import { create } from "zustand";
import type { TMovie } from "../types/movieType";

interface ModalState {
  isOpen: boolean;
  selectedMovie: TMovie | null;
  openModal: () => void;
  closeModal: () => void;
  setSelectedMovie: (movie: TMovie | null) => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  selectedMovie: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, selectedMovie: null }),
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
}));
