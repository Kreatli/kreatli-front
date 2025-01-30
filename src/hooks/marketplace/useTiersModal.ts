import { create } from 'zustand';

interface State {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useTiersModal = create<State>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
