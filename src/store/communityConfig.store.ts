import { Community } from "@/types/community";
import { create } from "zustand";

type StoreProps = {
  data: Community | null;
  update: (value: Community) => void;
  clear: () => void;
};

const useCommunityStore = create<StoreProps>((set) => ({
  data: null,
  update: (value) => set((state) => ({ data: { ...state.data, ...value } })),
  clear: () => set({ data: null }),
}));

export default useCommunityStore;
