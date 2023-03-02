import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FieldPoint } from "../components/FieldInput";
import { GridData } from "../components/GridInput";

export type MatchState = {
    scouter: string;

    autonomousStartingLocation?: FieldPoint;
    autonomousLeftCommunityZone: boolean;
    autonomousGridData?: GridData;
    autonomousDockedToChargeStation: boolean;
    autonomousChargeStationEngaged: boolean;
};

type ActiveMatchActions = {
    save: () => MatchState;
    reset: () => void;

    setScouter: (newScouter: string) => void;

    setAutonomousStartingLocation: (newStartingLocation: FieldPoint) => void;
    setAutonomousLeftCommunityZone: (didLeaveCommunityZone: boolean) => void;
    setAutonomousGridData: (newStartingLocation: GridData) => void;
    setAutonomousDockedToChargeStation: (
        isDockedToChargeStation: boolean
    ) => void;
    setAutonomousChargeStationEngaged: (
        chargeStationIsEngaged: boolean
    ) => void;
};

const defaultActiveMatchState: MatchState = {
    scouter: "",
    autonomousStartingLocation: undefined,
    autonomousLeftCommunityZone: false,
    autonomousGridData: undefined,
    autonomousDockedToChargeStation: false,
    autonomousChargeStationEngaged: false,
};

export const useActiveMatch = create<MatchState & ActiveMatchActions>()(
    persist(
        (set, get) => ({
            ...defaultActiveMatchState,

            setScouter: (newScouter) => set({ scouter: newScouter }),

            setAutonomousStartingLocation: (newStartingLocation) =>
                set({
                    autonomousStartingLocation: newStartingLocation,
                }),

            setAutonomousLeftCommunityZone: (didLeaveCommunityZone) =>
                set({
                    autonomousLeftCommunityZone: didLeaveCommunityZone,
                }),

            setAutonomousGridData: (newGridData) =>
                set({
                    autonomousGridData: newGridData,
                }),

            setAutonomousDockedToChargeStation: (isDockedToChargeStation) =>
                set({
                    autonomousDockedToChargeStation: isDockedToChargeStation,
                }),

            setAutonomousChargeStationEngaged: (chargeStationIsEngaged) =>
                set({
                    autonomousChargeStationEngaged: chargeStationIsEngaged,
                }),

            save: () => {
                const state = Object.entries(get()).filter(
                    ([key, value]) => typeof value !== "function"
                );

                return Object.fromEntries(state) as MatchState;
            },

            reset: () => {
                set(defaultActiveMatchState);
            },
        }),
        {
            name: "active-match-persistence",
        }
    )
);
