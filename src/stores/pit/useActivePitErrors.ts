import { useMemo } from "react";
import { z } from "zod";
import { PitState } from "./pitTypes";
import { useActivePit } from "./activePit";

export const useActivePitErrors = (): z.inferFlattenedErrors<
    ReturnType<typeof PitState>
>["fieldErrors"] => {
    const state = useActivePit((state) => state);

    const safeParseResult = useMemo(() => PitState().safeParse(state), [state]);

    if (safeParseResult.success)
        return Object.fromEntries(
            PitState()
                .keyof()
                .options.map((val) => [val, undefined])
        );

    return safeParseResult.error.flatten().fieldErrors;
};
