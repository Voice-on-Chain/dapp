import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DataProps {
  name: string;
  description: string;
  contract_address: string;
  twitter: string;
  website: string;
  criterias: string[];
  logo: File;
  banner: File;
  voice_power_rate: number;
  minimum_voice_power_required_to_join: number;
  post: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  comment: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  proposal: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  poll: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  token_to_distribute: number;
  distribution_date: Date;
}

type StoreProps = {
  data: Partial<DataProps> | null;
  update: (value: Partial<DataProps>) => void;
  clear: () => void;
};

const useCreateCommunityStore = create<StoreProps>()(
  persist(
    (set) => ({
      data: null,
      update: (value) =>
        set((state) => ({ data: { ...state.data, ...value } })),
      clear: () => set({ data: null }),
    }),
    {
      name: "Community",
    }
  )
);

export default useCreateCommunityStore;
