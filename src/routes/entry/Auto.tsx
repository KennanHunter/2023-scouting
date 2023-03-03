import { Checkbox, Stack, Title, Text } from "@mantine/core";
import { FC } from "react";
import { FieldInput } from "../../components/FieldInput";
import { GridInput } from "../../components/GridInput";
import { useActiveMatch } from "../../stores/activeMatch";

export const Auto: FC = () => {
    const autonomousStartingLocation = useActiveMatch(
        (state) => state.autonomousStartingLocation
    );
    const setAutonomousStartingLocation = useActiveMatch(
        (state) => state.setAutonomousStartingLocation
    );

    const autonomousLeftCommunityZone = useActiveMatch(
        (state) => state.autonomousLeftCommunityZone
    );
    const setAutonomousLeftCommunityZone = useActiveMatch(
        (state) => state.setAutonomousLeftCommunityZone
    );

    const autonomousGridData = useActiveMatch(
        (state) => state.autonomousGridData
    );
    const setAutonomousGridData = useActiveMatch(
        (state) => state.setAutonomousGridData
    );

    const autonomousDockedToChargeStation = useActiveMatch(
        (state) => state.autonomousDockedToChargeStation
    );
    const setAutonomousDockedToChargeStation = useActiveMatch(
        (state) => state.setAutonomousDockedToChargeStation
    );

    const autonomousChargeStationEngaged = useActiveMatch(
        (state) => state.autonomousChargeStationEngaged
    );
    const setAutonomousChargeStationEngaged = useActiveMatch(
        (state) => state.setAutonomousChargeStationEngaged
    );

    return (
        <Stack>
            <Title align="center">Auto</Title>

            <Text size="lg">Starting Position</Text>
            <FieldInput
                onChange={(data) => setAutonomousStartingLocation(data[0])}
                singlePoint
                data={
                    autonomousStartingLocation
                        ? [autonomousStartingLocation]
                        : [{ x: 0.5, y: 0.5 }]
                }
            />
            <Checkbox
                label="Left Community Zone"
                size="lg"
                my={8}
                checked={autonomousLeftCommunityZone}
                onChange={(event) => {
                    setAutonomousLeftCommunityZone(event.target.checked);
                }}
            />
            <Text size="lg">Grid</Text>
            <GridInput
                onChange={(data) => setAutonomousGridData(data)}
                data={autonomousGridData}
            />
            <Checkbox
                label="Docked to Charge Station"
                size="lg"
                my={8}
                checked={autonomousDockedToChargeStation}
                onChange={(event) => {
                    setAutonomousDockedToChargeStation(event.target.checked);
                }}
            />
            <Checkbox
                label="Charging Station Engaged"
                size="lg"
                my={8}
                checked={autonomousChargeStationEngaged}
                onChange={(event) => {
                    setAutonomousChargeStationEngaged(event.target.checked);
                }}
            />
        </Stack>
    );
};
