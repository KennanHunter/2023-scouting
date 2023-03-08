import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initGridData } from "../../components/GridInput";
import { MatchLevel, MatchState, ParkState } from "./matchTypes";

type ActiveMatchActions = {
    save: () => MatchState;
    clear: () => void;

    set: <T extends keyof MatchState>(
        setKey: T
    ) => (value: MatchState[T]) => void;
};

const defaultActiveMatchState: MatchState = {
    scouter: "",
    matchLevel: MatchLevel().Enum.Qualifications,
    matchNumber: 0,
    teamNumber: 0,

    teamNoShow: false,

    autonomousStartingLocation: { x: 0.5, y: 0.5 },
    autonomousLeftCommunityZone: false,
    autonomousGridData: initGridData(),
    autonomousDockedToChargeStation: false,
    autonomousChargeStationEngaged: false,

    teleopGroundPickups: 0,
    teleopSubstation1Pickups: 0,
    teleopSubstation2LowPickups: 0,
    teleopSubstation2HighPickups: 0,
    teleopGridData: initGridData(),

    endgameParking: "None",
    endgameTippedChargeStation: false,
    endgameRobotsDocked: 0,
    endgameLinksCompleted: 0,

    diedOnField: false,
    comments: "",

    time: undefined
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

            clear: () => set(defaultActiveMatchState),

            set: (setKey) => (value) => set({ [setKey]: value }),
        }),
        {
            name: "active-match-persistence",
        }
    )
);
