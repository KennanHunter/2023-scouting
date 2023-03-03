import { NumberInput, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { GridInput } from "../../components/GridInput";
import { useActiveMatch } from "../../stores/activeMatch";

export const Teleop: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        teleopGroundPickups,
        teleopSubstation1Pickups,
        teleopSubstation2LowPickups,
        teleopSubstation2HighPickups,
        teleopGridData,
    } = useActiveMatch((state) => state);

    return (
        <Stack>
            <Title align="center">Teleop</Title>

            <NumberInput
                value={teleopGroundPickups}
                onChange={(value) => set("teleopGroundPickups")(value ?? 0)}
                error={
                    teleopGroundPickups < 0
                        ? "Value cannot be less than 0!"
                        : undefined
                }
                placeholder="Ground Pickups"
                label="Ground Pickups"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teleopSubstation1Pickups}
                onChange={(value) =>
                    set("teleopSubstation1Pickups")(value ?? 0)
                }
                error={
                    teleopSubstation1Pickups < 0
                        ? "Value cannot be less than 0!"
                        : undefined
                }
                placeholder="Substation 1 Pickups"
                label="Substation 1 Pickups"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teleopSubstation2LowPickups}
                onChange={(value) =>
                    set("teleopSubstation2LowPickups")(value ?? 0)
                }
                error={
                    teleopSubstation2LowPickups < 0
                        ? "Value cannot be less than 0!"
                        : undefined
                }
                placeholder="Substation 2 Low Pickups"
                label="Substation 2 Low Pickups"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teleopSubstation2HighPickups}
                onChange={(value) =>
                    set("teleopSubstation2HighPickups")(value ?? 0)
                }
                error={
                    teleopSubstation2HighPickups < 0
                        ? "Value cannot be less than 0!"
                        : undefined
                }
                placeholder="Substation 2 High Pickups"
                label="Substation 2 High Pickups"
                size="lg"
                my={4}
            />

            <Text size="lg">Grid</Text>
            <GridInput
                onChange={(data) => set("teleopGridData")(data)}
                data={teleopGridData}
            />
        </Stack>
    );
};
