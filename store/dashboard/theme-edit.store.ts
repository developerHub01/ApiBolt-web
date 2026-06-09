import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ThemeInterface, TThemeType } from "@/types/themes.types";

interface ThemeEditState {
  name: string;
  themeType: TThemeType;
  palette: ThemeInterface["palette"];
  description: string;
  previewUrl: string;
  previewFile: File | null;
  isSubmitting: boolean;
  serverBaseline: {
    name: string;
    themeType: TThemeType;
    palette: ThemeInterface["palette"];
    description: string;
    previewUrl: string;
  } | null;

  setName: (name: string) => void;
  setThemeType: (type: TThemeType) => void;
  setPalette: (palette: ThemeInterface["palette"]) => void;
  setDescription: (desc: string) => void;
  setPreviewUrl: (url: string) => void;
  setPreviewFile: (file: File | null) => void;
  setIsSubmitting: (status: boolean) => void;
  setServerBaseline: (baseline: ThemeEditState["serverBaseline"]) => void;
  resetToBaseline: () => void;
  resetForm: () => void;
}

const useThemeEditStore = create<ThemeEditState>()(
  immer((set) => ({
    name: "",
    themeType: "dark",
    palette: {},
    description: "",
    previewUrl: "",
    previewFile: null,
    isSubmitting: false,
    serverBaseline: null,

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
    setPreviewUrl: (url) =>
      set((state) => {
        state.previewUrl = url;
      }),
    setPreviewFile: (file) =>
      set((state) => {
        state.previewFile = file;
        state.previewUrl = file ? URL.createObjectURL(file) : state.previewUrl;
      }),
    setIsSubmitting: (status) =>
      set((state) => {
        state.isSubmitting = status;
      }),
    setServerBaseline: (baseline) =>
      set((state) => {
        state.serverBaseline = baseline;
      }),

    resetToBaseline: () =>
      set((state) => {
        if (!state.serverBaseline) return;
        state.name = state.serverBaseline.name;
        state.themeType = state.serverBaseline.themeType;
        state.palette = { ...state.serverBaseline.palette };
        state.description = state.serverBaseline.description;
        state.previewUrl = state.serverBaseline.previewUrl;
        state.previewFile = null;
      }),

    resetForm: () =>
      set((state) => {
        state.name = "";
        state.themeType = "dark";
        state.palette = {};
        state.description = "";
        state.previewUrl = "";
        state.previewFile = null;
        state.isSubmitting = false;
        state.serverBaseline = null;
      }),
  })),
);

export default useThemeEditStore;
