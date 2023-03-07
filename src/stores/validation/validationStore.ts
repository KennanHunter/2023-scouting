import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useValidationState = create<{
    valid: boolean;
    set: (valid: boolean) => void;
}>()(
    persist(
        (set) => ({
            valid: true,
            set: (valid) => set({ valid: valid }),
            clear: () => set({ valid: false }),
        }),
        { name: "validation-store" }
    )
);
