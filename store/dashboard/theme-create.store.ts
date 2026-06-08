import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_THEME_PALETTE } from "@/constant/default-theme.constant";
import { ThemeInterface, TThemeType } from "@/types/themes.types";

interface ThemeCreateState {
  name: string;
  themeType: TThemeType;
  palette: ThemeInterface["palette"];
  description: string;
  previewUrl: string;
  previewFile: File | null;
  isSubmitting: boolean;

  setName: (name: string) => void;
  setThemeType: (type: TThemeType) => void;
  setPalette: (palette: ThemeInterface["palette"]) => void;
  setDescription: (desc: string) => void;
  setPreviewFile: (file: File | null) => void;
  setIsSubmitting: (status: boolean) => void;
  resetForm: () => void;
}

const useThemeCreateStore = create<ThemeCreateState>()(
  immer((set) => ({
    name: "",
    themeType: "dark",
    palette: {
      ...DEFAULT_THEME_PALETTE,
    },
    description: "",
    previewUrl: "",
    previewFile: null,
    isSubmitting: false,

    setName: (name) =>
      set((state) => {
        state.name = name;
      }),
    setThemeType: (type) =>
      set((state) => {
        state.themeType = type;
      }),
    setPalette: (palette) =>
      set((state) => {
        state.palette = palette;
      }),
    setDescription: (desc) =>
      set((state) => {
        state.description = desc;
      }),
    setPreviewFile: (file) =>
      set((state) => {
        state.previewFile = file;
        state.previewUrl = file ? URL.createObjectURL(file) : "";
      }),
    setIsSubmitting: (status) =>
      set((state) => {
        state.isSubmitting = status;
      }),
    resetForm: () =>
      set((state) => {
        state.name = "";
        state.themeType = "dark";
        state.palette = {
          ...DEFAULT_THEME_PALETTE,
        };
        state.description = "";
        state.previewUrl = "";
        state.previewFile = null;
        state.isSubmitting = false;
      }),
  })),
);

export default useThemeCreateStore;
