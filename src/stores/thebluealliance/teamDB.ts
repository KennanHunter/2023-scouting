import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MatchTeams, TeamPosition } from "./teamTypes";

export const useTeamDB = create<{
    db: MatchTeams[];
    teamPosition: TeamPosition;
    push: (newMatchTeams: MatchTeams[]) => void;
    setTeamPosition: (newTeamPosition: TeamPosition) => void;
    getTeamNumber: (matchNumber: number) => number | undefined;
    clear: () => void;
}>()(
    persist(
        (set, get) => ({
            db: [],
            teamPosition: TeamPosition().Enum["Red 1"],
            push: (newMatchTeams) =>
                set((get) => ({
                    db: [...get.db, ...newMatchTeams],
                })),
            setTeamPosition: (newTeamPosition: TeamPosition) =>
                set((get) => ({
                    teamPosition: newTeamPosition,
                })),
            getTeamNumber: (matchNumber: number) => {
                return get().db.find(
                    (match) => match.matchNumber == matchNumber
                )?.[get().teamPosition];
            },
            clear: () =>
                set({ db: [], teamPosition: TeamPosition().Enum["Red 1"] }),
        }),
        { name: "teams-db" }
    )
);
