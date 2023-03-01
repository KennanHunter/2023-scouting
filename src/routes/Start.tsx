import { Stack } from "@mantine/core";
import { FC } from "react";
import { z } from "zod";
import { FieldInput, FieldPoint } from "../components/FieldInput";
import { useActiveMatch } from "../stores/activeMatch";

export const Start: FC = () => {
    const startingLocation = useActiveMatch((state) => state.startingLocation);
    const setStartingLocation = useActiveMatch(
        (state) => state.setStartingLocation
    );

    return (
        <Stack>
            <h1>Match Start</h1>
            <FieldInput
                onChange={(data) => setStartingLocation(data[0])}
                singlePoint
                data={
                    startingLocation ? [startingLocation] : [{ x: 0.5, y: 0.5 }]
                }
            />
        </Stack>
    );
};
