import { create } from "zustand";

interface ToastStore {
  message: string;
  toastId: number;
  showToast: (message: string) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastStore>()((set) => ({
  message: "",
  toastId: 0,

  showToast: (message) =>
    set((state) => ({
      message,
      toastId: state.toastId + 1,
    })),

  clearToast: () => set({ message: "" }),
}));
