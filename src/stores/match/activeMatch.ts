import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initGridData } from "../../components/GridInput";
import { useTeamDB } from "../thebluealliance/teamDB";
import {
    AutoParkState,
    DefenseRating,
    EndgameParkState,
    MatchLevel,
    MatchState,
} from "./matchTypes";

type ActiveMatchActions = {
    save: () => MatchState;
    clear: () => void;

    set: <T extends keyof MatchState>(
        setKey: T
    ) => (value: MatchState[T]) => void;
};

const defaultActiveMatchState: () => MatchState = (
    props?: Partial<MatchState>
) => ({
    scouter: "",
    matchLevel: MatchLevel().Enum.Qualifications,
    matchNumber: 0,
    teamNumber: 0,

    teamNoShow: false,

    autonomousStartingLocation: { x: 0.5, y: 0.5 },
    autonomousLeftCommunityZone: false,
    autonomousGridData: initGridData(),
    autonomousParking: AutoParkState().Enum.None,

    teleopGroundPickups: 0,
    teleopSubstation1Pickups: 0,
    teleopSubstation2LowPickups: 0,
    teleopSubstation2HighPickups: 0,
    teleopRunnerRobot: false,
    teleopGridData: initGridData(),

    endgameParking: EndgameParkState().Enum.None,
    endgameCoopertitionBonus: false,
    endgameRobotsDocked: 0,
    endgameLinksCompleted: 0,

    defenseRating: DefenseRating().Enum["Not Played"],
    diedOnField: false,
    comments: "",

    ...props,
});

export const useActiveMatch = create<MatchState & ActiveMatchActions>()(
    persist(
        (set, get) => ({
            ...defaultActiveMatchState(),

            save: () => {
                const { teamPosition, eventKey } = useTeamDB.getState();

                const state = Object.entries(get()).filter(
                    ([key, value]) => typeof value !== "function"
                );

                return {
                    ...(Object.fromEntries(state) as MatchState),
                    date: new Date().toString(),
                    side: teamPosition,
                    eventCode: eventKey,
                } as MatchState;
            },

            clear: () => set(defaultActiveMatchState()),

            set: (setKey) => (value) => set({ [setKey]: value }),
        }),
        {
            name: "active-match-persistence",
        }
    )
);
