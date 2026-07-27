import { create } from 'zustand';

/**
 * Global Zustand UI Store - managing mobile drawer, global loaders, and UI layout states.
 */
export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  isContactDrawerOpen: false,

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  toggleContactDrawer: () => set((state) => ({ isContactDrawerOpen: !state.isContactDrawerOpen })),
  closeContactDrawer: () => set({ isContactDrawerOpen: false }),
}));
