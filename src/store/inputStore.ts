import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type InputState = {
  search: string;
};

export type InputActions = {
  setSearch: (search: string) => void;
};

export type InputStore = InputState & InputActions;

export const defaultInitState: InputState = {
  search: "",
};

export const useInputStore = create<InputStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...defaultInitState,
        setSearch: (search) =>
          set((state: InputState) => {
            state.search = search;
          }),
      })),
      {
        name: "input-storage",
      }
    )
  )
);
