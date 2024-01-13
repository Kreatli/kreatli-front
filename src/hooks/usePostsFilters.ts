import { create } from 'zustand';

interface State {
  filter: 'allPosts' | 'feedbackPosts' | 'myPosts';
  setFilter: (filter: 'allPosts' | 'feedbackPosts' | 'myPosts') => void;
}

export const usePostsFilters = create<State>((set) => ({
  filter: 'allPosts',
  setFilter: (filter) => set({ filter }),
}));
