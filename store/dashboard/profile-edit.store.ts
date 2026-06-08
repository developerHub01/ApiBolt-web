import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_PROFILE_COVER } from "@/constant/profile.constant";

interface ProfileEditState {
  fullName: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  avatarFile: File | null;
  coverFile: File | null;
  isSubmitting: boolean;
  serverBaseline: {
    fullName: string;
    bio: string;
  } | null;

  setFullName: (name: string) => void;
  setBio: (bio: string) => void;
  setAvatarUrl: (url: string) => void;
  setCoverUrl: (url: string) => void;
  setAvatarFile: (file: File | null) => void;
  setCoverFile: (file: File | null) => void;
  setIsSubmitting: (status: boolean) => void;
  setServerBaseline: (baseline: ProfileEditState["serverBaseline"]) => void;
  resetToBaseline: () => void;
}

const useProfileEditStore = create<ProfileEditState>()(
  immer((set) => ({
    fullName: "",
    bio: "",
    avatarUrl: "",
    coverUrl: DEFAULT_PROFILE_COVER,
    avatarFile: null,
    coverFile: null,
    isSubmitting: false,
    serverBaseline: null,

    setFullName: (name) =>
      set((state) => {
        state.fullName = name;
      }),
    setBio: (bio) =>
      set((state) => {
        state.bio = bio;
      }),
    setAvatarUrl: (url) =>
      set((state) => {
        state.avatarUrl = url;
      }),
    setCoverUrl: (url) =>
      set((state) => {
        state.coverUrl = url;
      }),
    setAvatarFile: (file) =>
      set((state) => {
        state.avatarFile = file;
        if (file) state.avatarUrl = URL.createObjectURL(file);
      }),
    setCoverFile: (file) =>
      set((state) => {
        state.coverFile = file;
        if (file) state.coverUrl = URL.createObjectURL(file);
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
        state.fullName = state.serverBaseline.fullName;
        state.bio = state.serverBaseline.bio;
        state.avatarFile = null;
        state.coverFile = null;
      }),
  })),
);

export default useProfileEditStore;
