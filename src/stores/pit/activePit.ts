import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DrivetrainType, PitState } from "./pitTypes";

type ActivePitActions = {
    save: () => PitState;
    clear: () => void;

    set: <T extends keyof PitState>(setKey: T) => (value: PitState[T]) => void;
};

export const defaultActivePitState: PitState = {
    scouter: "",
    teamNumber: 0,

    robotHeight: 0,
    robotLength: 0,
    robotWidth: 0,
    robotWeight: 0,

    robotDrivetrain: DrivetrainType().enum.None,

    robotCanPickupRamp: false,
    robotCanPickupShelf: false,
    robotCanPickupFloor: false,

    robotCanDockAuto: false,
    robotCanDockTeleop: false,

    robotCanEngageAuto: false,
    robotCanEngageTeleop: false,

    robotCanManipulateCone: false,
    robotCanManipulateCube: false,

    autonomousCanExitCommunity: false,

    autonomousGridPlaceTop: false,
    autonomousGridPlaceMiddle: false,
    autonomousGridPlaceBottom: false,

    autonomousNumberOfPrograms: 0,

    teleopGridPlaceTop: false,
    teleopGridPlaceMiddle: false,
    teleopGridPlaceBottom: false,

    teleopPlaysDefense: false,

    teleopRunnerRobot: false,

    comments: "",

    time: undefined,
} as any;

export const useActivePit = create<PitState & ActivePitActions>()(
    persist(
        (set, get) => ({
            ...defaultActivePitState,

            save: () => {
                const state = Object.entries(get()).filter(
                    ([key, value]) => typeof value !== "function"
                );

                return Object.fromEntries(state) as PitState;
            },

            clear: () => set(defaultActivePitState),

            set: (setKey) => (value) => set({ [setKey]: value }),
        }),
        {
            name: "active-pit-persistence",
        }
    )
);
