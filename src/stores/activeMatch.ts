import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FieldPoint } from "../components/FieldInput";
import { GridData } from "../components/GridInput";
import { MatchState } from "./matchTypes";

export enum ParkState {
    DockEngage = "DockEngage",
    Dock = "Dock",
    Park = "Park",
    None = "None",
}

type ActiveMatchActions = {
    save: () => MatchState;
    reset: () => void;

    set: <T extends keyof MatchState>(
        setKey: T
    ) => (value: MatchState[T]) => void;
};

const defaultActiveMatchState: MatchState = {
    scouter: "",

    autonomousStartingLocation: undefined,
    autonomousLeftCommunityZone: false,
    autonomousGridData: undefined,
    autonomousDockedToChargeStation: false,
    autonomousChargeStationEngaged: false,

    teleopGroundPickups: 0,
    teleopSubstation1Pickups: 0,
    teleopSubstation2LowPickups: 0,
    teleopSubstation2HighPickups: 0,
    teleopGridData: undefined,

    endgameParking: ParkState.None,
    endgameTippedChargeStation: false,
    endgameRobotsDocked: 0,

    mechanicalFailures: "",
    comments: "",
};

export const useActiveMatch = create<MatchState & ActiveMatchActions>()(
    persist(
        (set, get) => ({
            ...defaultActiveMatchState,

            save: () => {
                const state = Object.entries(get()).filter(
                    ([key, value]) => typeof value !== "function"
                );

                return Object.fromEntries(state) as MatchState;
            },

            reset: () => {
                set(defaultActiveMatchState);
            },

            set: (setKey) => (value) => set({ [setKey]: value }),
        }),
        {
            name: "active-match-persistence",
        }
    )
);
