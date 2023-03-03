import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FieldPoint } from "../components/FieldInput";
import { GridData } from "../components/GridInput";

export enum ParkState {
    DockEngage,
    Dock,
    Park,
    None
}

export type MatchState = {
    scouter: string;

    autonomousStartingLocation?: FieldPoint;
    autonomousLeftCommunityZone: boolean;
    autonomousGridData?: GridData;
    autonomousDockedToChargeStation: boolean;
    autonomousChargeStationEngaged: boolean;

    teleopGroundPickups: number;
    teleopSubstation1Pickups: number;
    teleopSubstation2LowPickups: number;
    teleopSubstation2HighPickups: number;
    teleopGridData?: GridData;

    endgameParking: ParkState;
    endgameTippedChargeStation: boolean;
    endgameRobotsDocked: number;
    
    mechanicalFailures: string;
    comments: string
};

type ActiveMatchActions = {
    save: () => MatchState;
    reset: () => void;

    setScouter: (newScouter: string) => void;

    setAutonomousStartingLocation: (newStartingLocation: FieldPoint) => void;
    setAutonomousLeftCommunityZone: (didLeaveCommunityZone: boolean) => void;
    setAutonomousGridData: (newGridData: GridData) => void;
    setAutonomousDockedToChargeStation: (
        isDockedToChargeStation: boolean
    ) => void;
    setAutonomousChargeStationEngaged: (
        chargeStationIsEngaged: boolean
    ) => void;

    setTeleopGroundPickups: (pickups: number) => void;
    setTeleopSubstation1Pickups: (pickups: number) => void;
    setTeleopSubstation2LowPickups: (pickups: number) => void;
    setTeleopSubstation2HighPickups: (pickups: number) => void;
    setTeleopGridData: (newGridData: GridData) => void;

    setEndgameParking: (parkState: ParkState) => void;
    setEndgameTippedChargeStation: (tipped: boolean) => void;
    setEndgameRobotsDocked: (docked: number) => void;

    setMechanicalFailures: (description: string) => void;
    setComments: (description: string) => void;
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

            setTeleopGroundPickups: (pickups) => 
                set({
                    teleopGroundPickups: pickups
                }),

            setTeleopSubstation1Pickups: (pickups) => 
                set({
                    teleopSubstation1Pickups: pickups
                }),

            setTeleopSubstation2LowPickups: (pickups) => 
                set({
                    teleopSubstation2LowPickups: pickups
                }),

            setTeleopSubstation2HighPickups: (pickups) => 
                set({
                    teleopSubstation2HighPickups: pickups
                }),

            setTeleopGridData: (newGridData) =>
                set({
                    teleopGridData: newGridData,
                }),

            setEndgameParking: (parkState) =>
                set({
                    endgameParking: parkState,
                }),

            setEndgameTippedChargeStation: (tipped) =>
                set({
                    endgameTippedChargeStation: tipped,
                }),

            setEndgameRobotsDocked: (docked) =>
                set({
                    endgameRobotsDocked: docked,
                }),

            setMechanicalFailures: (description) =>
                set({
                    mechanicalFailures: description,
                }),

            setComments: (description) =>
                set({
                    comments: description,
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
