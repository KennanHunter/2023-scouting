import {
    Checkbox,
    NumberInput,
    Radio,
    Stack, Textarea, TextInput, Title
} from "@mantine/core";
import { FC } from "react";
import { ParkState, useActiveMatch } from "../../stores/activeMatch";

export const Endgame: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const { endgameParking, endgameTippedChargeStation, endgameRobotsDocked, mechanicalFailures, comments } = useActiveMatch((state) => state);

    return (
        <Stack>
            <Title align="center">Endgame</Title>

            <Radio.Group
                label="Parking"
                my={4}
                onChange={(value) => set("endgameParking")(value as ParkState)}
                value={endgameParking}
            >
                <Radio
                    value={ParkState.DockEngage}
                    label="Docked + Engaged"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={ParkState.Dock}
                    label="Docked Only"
                    size="lg"
                    m={4}
                />
                <Radio value={ParkState.Park} label="Parked" size="lg" m={4} />
                <Radio value={ParkState.None} label="None" size="lg" m={4} />
            </Radio.Group>

            <Checkbox
                label="Tipped Charging Station"
                size="lg"
                my={8}
                checked={endgameTippedChargeStation}
                onChange={(event) => {
                    set("endgameTippedChargeStation")(event.target.checked);
                }}
            />

            <NumberInput
                value={endgameRobotsDocked}
                onChange={(value) => set("endgameRobotsDocked")(value ?? 0)}
                error={
                    endgameRobotsDocked < 0
                        ? "Value cannot be less than 0!"
                        : undefined
                }
                placeholder="Robots Docked"
                label="Robots Docked"
                size="lg"
                my={4}
            />

            <TextInput
                value={mechanicalFailures}
                onChange={(event) => set("mechanicalFailures")(event.target.value)}
                placeholder="Brief Description"
                label="Mechanical Failures"
                size="lg"
                my={4}
            />

            <Textarea
                value={comments}
                onChange={(event) => set("comments")(event.target.value)}
                label="Comments"
                size="lg"
                my={4}
            />
        </Stack>
    );
};
