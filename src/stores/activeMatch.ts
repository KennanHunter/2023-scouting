import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FieldPoint } from "../components/FieldInput";

type ActiveMatchState = {
    scouter: string;
    startingLocation: FieldPoint | undefined;
};

type ActiveMatchActions = {
    setScouter: (newScouter: string) => void;
    setStartingLocation: (newStartingLocation: FieldPoint) => void;
};

export const useActiveMatch = create<ActiveMatchState & ActiveMatchActions>()(
    persist(
        (set) => ({
            scouter: "",
            setScouter: (newScouter) => set({ scouter: newScouter }),

            startingLocation: undefined,
            setStartingLocation: (newStartingLocation) =>
                set({ startingLocation: newStartingLocation }),
        }),
        {
            name: "active-match-persistence",
        }
    )
);
