import { useMemo } from "react";
import { z } from "zod";
import { useActiveMatch } from "./activeMatch";
import { MatchState } from "./matchTypes";

export const useActiveMatchErrors = (): z.inferFlattenedErrors<
    ReturnType<typeof MatchState>
>["fieldErrors"] => {
    const state = useActiveMatch((state) => state);

    const safeParseResult = useMemo(
        () => MatchState().safeParse(state),
        [state]
    );

    if (safeParseResult.success)
        return Object.fromEntries(
            MatchState()
                .keyof()
                .options.map((val) => [val, undefined])
        );

    return safeParseResult.error.flatten().fieldErrors;
};
