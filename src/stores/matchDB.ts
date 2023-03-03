import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MatchState } from "./activeMatch";

export const useMatchDB = create<{
    db: MatchState[];
    push: (newMatch: MatchState) => void;
    clear: () => void;
}>()(
    persist(
        (set) => ({
            db: [],
            push: (newMatch) => set((get) => ({ db: [...get.db, newMatch] })),
            clear: () => set({ db: [] })
        }),
        { name: "match-db" }
    )
);
