import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MatchState } from "./matchTypes";

export const useMatchDB = create<{
    db: MatchState[];
    push: (newMatch: MatchState) => void;
    insertNew: (newMatches: MatchState[]) => void;
    clear: () => void;
}>()(
    persist(
        (set) => ({
            db: [],
            push: (newMatch) =>
                set((get) => ({
                    db: [...get.db, { ...newMatch, time: Date.now() }],
                })),
            insertNew: (newMatches) => 
                set((get) => {
                    const filteredMatches: MatchState[] = newMatches.filter((parsedMatch) =>
                        get.db.filter((matchDBMatch) => matchDBMatch.time == parsedMatch.time).length == 0
                    );

                    return ({
                        db: [...get.db, ...filteredMatches],
                    })
                }),
            clear: () => set({ db: [] }),
        }),
        { name: "match-db" }
    )
);
