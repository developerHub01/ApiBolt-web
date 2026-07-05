import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StateInterface {
  isMobileMenuOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: (value?: boolean) => void;
}

export const useSidebarStore = create<StateInterface>()(
  immer((set) => ({
    isMobileMenuOpen: false,

    handleOpen: () =>
      set((state) => {
        state.isMobileMenuOpen = true;
      }),
    handleClose: () =>
      set((state) => {
        state.isMobileMenuOpen = false;
      }),
    handleToggle: (value) =>
      set((state) => {
        state.isMobileMenuOpen = value ?? !state.isMobileMenuOpen;
      }),
  })),
);
