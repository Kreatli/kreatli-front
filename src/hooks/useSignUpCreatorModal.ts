import { create } from 'zustand';

interface State {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSignUpCreatorModal = create<State>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
