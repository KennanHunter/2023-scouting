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
            teamPosition: "Red 1",
            push: (newMatchTeams) =>
                set((get) => ({
                    db: [...get.db, ...newMatchTeams],
                    teamPosition: get.teamPosition,
                })),
            setTeamPosition: (newTeamPosition: TeamPosition) =>
                set((get) => ({
                    db: get.db,
                    teamPosition: newTeamPosition,
                })),
            getTeamNumber: (matchNumber: number) => {
                return get().db.find(
                    (match) => match.matchNumber == matchNumber
                )?.[get().teamPosition];
            },
            clear: () => set({ db: [], teamPosition: "Red 1" }),
        }),
        { name: "teams-db" }
    )
);
