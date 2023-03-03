import {
    Checkbox,
    NumberInput,
    Radio,
    Stack,
    Textarea,
    Title,
} from "@mantine/core";
import { FC } from "react";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { ParkState } from "../../stores/match/matchTypes";

export const Endgame: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        endgameParking,
        endgameTippedChargeStation,
        endgameRobotsDocked,
        endgameLinksCompleted,
        diedOnField,
        comments,
    } = useActiveMatch((state) => state);

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
                    value={ParkState().enum.DockEngage}
                    label="Docked + Engaged"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={ParkState().enum.Dock}
                    label="Docked Only"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={ParkState().enum.Park}
                    label="Parked"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={ParkState().enum.None}
                    label="None"
                    size="lg"
                    m={4}
                />
            </Radio.Group>

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

            <NumberInput
                value={endgameLinksCompleted}
                onChange={(value) => set("endgameLinksCompleted")(value ?? 0)}
                error={
                    endgameLinksCompleted < 0
                        ? "Value cannot be less than 0!"
                        : undefined
                }
                placeholder="Ground Pickups"
                label="Ground Pickups"
                size="lg"
                my={4}
            />

            <Checkbox
                label="Died on Field"
                size="lg"
                my={8}
                checked={diedOnField}
                onChange={(event) => {
                    set("diedOnField")(event.target.checked);
                }}
            />

            <Checkbox
                label="Died on Field"
                size="lg"
                my={8}
                checked={diedOnField}
                onChange={(event) => {
                    set("diedOnField")(event.target.checked);
                }}
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
