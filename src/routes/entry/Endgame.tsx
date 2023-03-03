import { Checkbox, NumberInput, Radio, Stack, TextInput, Textarea, Title } from "@mantine/core";
import { FC } from "react";
import { FieldInput } from "../../components/FieldInput";
import { GridInput } from "../../components/GridInput";
import { ParkState, useActiveMatch } from "../../stores/activeMatch";

export const Endgame: FC = () => {
    const endgameParking = useActiveMatch(
        (state) => state.endgameParking
    );
    const setEndgameParking = useActiveMatch(
        (state) => state.setEndgameParking
    );

    const endgameTippedChargeStation = useActiveMatch(
        (state) => state.endgameTippedChargeStation
    );
    const setEndgameTippedChargeStation = useActiveMatch(
        (state) => state.setEndgameTippedChargeStation
    );

    const endgameRobotsDocked = useActiveMatch(
        (state) => state.endgameRobotsDocked
    );
    const setEndgameRobotsDocked = useActiveMatch(
        (state) => state.setEndgameRobotsDocked
    );

    const mechanicalFailures = useActiveMatch(
        (state) => state.mechanicalFailures
    );
    const setMechanicalFailures = useActiveMatch(
        (state) => state.setMechanicalFailures
    );

    const comments = useActiveMatch(
        (state) => state.comments
    );
    const setComments = useActiveMatch(
        (state) => state.setComments
    );

    console.log(endgameParking)

    return (
        <Stack>
            <Title align="center">Endgame</Title>

            <Radio.Group
                label="Parking"
                my={4}
                onChange={(value) => setEndgameParking(Number(value))}
                // @ts-ignore for whatever reason Radio.Group is strings only and forcing ts to put an Enum in works anyways and is much cleaner
                value={endgameParking}
            >
                <Radio value={ParkState.DockEngage} label="Docked + Engaged" size="lg" m={4}/>
                <Radio value={ParkState.Dock} label="Docked Only" size="lg" m={4}/>
                <Radio value={ParkState.Park} label="Parked" size="lg" m={4}/>
                <Radio value={ParkState.None} label="None" size="lg" m={4}/>
            </Radio.Group>

            <Checkbox
                label="Tipped Charging Station"
                size="lg"
                my={8}
                checked={endgameTippedChargeStation}
                onChange={(event) => {
                    setEndgameTippedChargeStation(event.target.checked);
                }}
            />

            <NumberInput
                value={endgameRobotsDocked}
                onChange={(value) => setEndgameRobotsDocked(value ?? 0)}
                error={(endgameRobotsDocked < 0) ? "Value cannot be less than 0!" : undefined}
                placeholder="Robots Docked"
                label="Robots Docked"
                size="lg"
                my={4}
            />

            <TextInput
                value={mechanicalFailures}
                onChange={(event) => setMechanicalFailures(event.target.value)}
                placeholder="Brief Description"
                label="Mechanical Failures"
                size="lg"
                my={4}
            />

            <Textarea
                value={comments}
                onChange={(event) => setComments(event.target.value)}
                label="Comments"
                size="lg"
                my={4}
            />
        </Stack>
    );
};
