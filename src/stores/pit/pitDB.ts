import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PitState } from "./pitTypes";

export const usePitDB = create<{
    db: PitState[];
    push: (newPit: PitState) => void;
    clear: () => void;
}>()(
    persist(
        (set) => ({
            db: [],
            push: (newPit) =>
                set((get) => ({
                    db: [...get.db, { ...newPit, time: Date.now() }],
                })),
            clear: () => set({ db: [] }),
        }),
        { name: "pit-db" }
    )
);
