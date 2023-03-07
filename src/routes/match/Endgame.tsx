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
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";

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

    const errors = useActiveMatchErrors();

    return (
        <StackValidationChecker>
            <Title align="center">Endgame</Title>

            <Radio.Group
                label="Parking"
                my={4}
                onChange={(value) => set("endgameParking")(value as ParkState)}
                value={endgameParking}
                error={errors.endgameParking}
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
                error={errors.endgameRobotsDocked}
                placeholder="Robots Docked"
                label="Robots Docked"
                size="lg"
                my={4}
            />

            <NumberInput
                value={endgameLinksCompleted}
                onChange={(value) => set("endgameLinksCompleted")(value ?? 0)}
                error={errors.endgameLinksCompleted}
                placeholder="Links Completed"
                label="Links Completed"
                size="lg"
                my={4}
            />

            <Checkbox
                label="Tipped Charge Station"
                size="lg"
                my={8}
                checked={endgameTippedChargeStation}
                onChange={(event) => {
                    set("endgameTippedChargeStation")(event.target.checked);
                }}
                error={errors.endgameTippedChargeStation}
            />

            <Checkbox
                label="Died on Field"
                size="lg"
                my={8}
                checked={diedOnField}
                onChange={(event) => {
                    set("diedOnField")(event.target.checked);
                }}
                error={errors.diedOnField}
            />

            <Textarea
                value={comments}
                onChange={(event) => set("comments")(event.target.value)}
                label="Comments"
                size="lg"
                my={4}
                error={errors.comments}
            />
        </StackValidationChecker>
    );
};
