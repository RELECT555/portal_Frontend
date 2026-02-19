import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  searchQuery: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  searchQuery: '',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
