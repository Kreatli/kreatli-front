import { create } from 'zustand';

interface State {
  filter: 'allPosts' | 'feedbackPosts';
  setFilter: (filter: 'allPosts' | 'feedbackPosts') => void;
}

export const usePostsFilters = create<State>((set) => ({
  filter: 'allPosts',
  setFilter: (filter) => set({ filter }),
}));
