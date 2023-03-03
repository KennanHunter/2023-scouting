import { NumberInput, Stack, Title, Text } from "@mantine/core";
import { FC } from "react";
import { GridInput } from "../../components/GridInput";
import { useActiveMatch } from "../../stores/activeMatch";

export const Teleop: FC = () => {
    const teleopGroundPickups = useActiveMatch(
        (state) => state.teleopGroundPickups
    );
    const setTeleopGroundPickups = useActiveMatch(
        (state) => state.setTeleopGroundPickups
    );

    const teleopSubstation1Pickups = useActiveMatch(
        (state) => state.teleopSubstation1Pickups
    );
    const setTeleopSubstation1Pickups = useActiveMatch(
        (state) => state.setTeleopSubstation1Pickups
    );

    const teleopSubstation2LowPickups = useActiveMatch(
        (state) => state.teleopSubstation2LowPickups
    );
    const setTeleopSubstation2LowPickups = useActiveMatch(
        (state) => state.setTeleopSubstation2LowPickups
    );

    const teleopSubstation2HighPickups = useActiveMatch(
        (state) => state.teleopSubstation2HighPickups
    );
    const setTeleopSubstation2HighPickups = useActiveMatch(
        (state) => state.setTeleopSubstation2HighPickups
    );

    const teleopGridData = useActiveMatch(
        (state) => state.teleopGridData
    );
    const setTeleopGridData = useActiveMatch(
        (state) => state.setTeleopGridData
    );

    return (
        <Stack>
            <Title align="center">Teleop</Title>

            <NumberInput
                value={teleopGroundPickups}
                onChange={(value) => setTeleopGroundPickups(value ?? 0)}
                error={(teleopGroundPickups < 0) ? "Value cannot be less than 0!" : undefined}
                placeholder="Ground Pickups"
                label="Ground Pickups"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teleopSubstation1Pickups}
                onChange={(value) => setTeleopSubstation1Pickups(value ?? 0)}
                error={(teleopSubstation1Pickups < 0) ? "Value cannot be less than 0!" : undefined}
                placeholder="Substation 1 Pickups"
                label="Substation 1 Pickups"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teleopSubstation2LowPickups}
                onChange={(value) => setTeleopSubstation2LowPickups(value ?? 0)}
                error={(teleopSubstation2LowPickups < 0) ? "Value cannot be less than 0!" : undefined}
                placeholder="Substation 2 Low Pickups"
                label="Substation 2 Low Pickups"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teleopSubstation2HighPickups}
                onChange={(value) => setTeleopSubstation2HighPickups(value ?? 0)}
                error={(teleopSubstation2HighPickups < 0) ? "Value cannot be less than 0!" : undefined}
                placeholder="Substation 2 High Pickups"
                label="Substation 2 High Pickups"
                size="lg"
                my={4}
            />
            
            <Text size="lg">Grid</Text>
            <GridInput
                onChange={(data) => setTeleopGridData(data)}
                data={teleopGridData}
            />
        </Stack>
    );
};
