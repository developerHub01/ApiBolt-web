import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StateInterface {
  deleteCandidateId: string | null;
  isDeleting: boolean;
  setDeleteCandidate: (id: string | null) => void;
  setIsDeleting: (status: boolean) => void;
}

export const useThemesStore = create<StateInterface>()(
  immer((set) => ({
    deleteCandidateId: null,
    isDeleting: false,

    setDeleteCandidate: (id) =>
      set((state) => {
        state.deleteCandidateId = id;
      }),

    setIsDeleting: (status) =>
      set((state) => {
        state.isDeleting = status;
      }),
  })),
);
