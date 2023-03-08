import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PitState } from "./pitTypes";

export const usePitDB = create<{
    db: PitState[];
    push: (newPit: PitState) => void;
    insertNew: (newPits: PitState[]) => void;
    clear: () => void;
}>()(
    persist(
        (set) => ({
            db: [],
            push: (newPit) =>
                set((get) => ({
                    db: [...get.db, { ...newPit, time: Date.now() }],
                })),
            insertNew: (newPits) => 
                set((get) => {
                    const filteredPits: PitState[] = newPits.filter((parsedPit) =>
                        get.db.filter((pitDBMatch) => pitDBMatch.time == parsedPit.time).length == 0
                    );

                    return ({
                        db: [...get.db, ...filteredPits],
                    })
                }),
            clear: () => set({ db: [] }),
        }),
        { name: "pit-db" }
    )
);
