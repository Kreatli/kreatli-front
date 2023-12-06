import { create } from 'zustand';

interface State {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  openPopover: () => void;
  closePopover: () => void;
}

export const useNotificationsPopoverVisibility = create<State>((set) => ({
  isOpen: false,
  onOpenChange: (isOpen: boolean) => set({ isOpen }),
  openPopover: () => set({ isOpen: true }),
  closePopover: () => set({ isOpen: false }),
}));
