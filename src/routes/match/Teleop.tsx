import { NumberInput, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { GridInput } from "../../components/GridInput";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";

export const Teleop: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        teleopGroundPickups,
        teleopSubstation1Pickups,
        teleopSubstation2LowPickups,
        teleopSubstation2HighPickups,
        teleopGridData,
    } = useActiveMatch((state) => state);

    const errors = useActiveMatchErrors();

    return (
        <StackValidationChecker>
            <Title align="center">Teleop</Title>

            <NumberInput
                value={teleopGroundPickups}
                onChange={(value) => set("teleopGroundPickups")(value ?? 0)}
                error={errors.teleopGroundPickups}
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
                error={errors.teleopSubstation1Pickups}
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
                error={errors.teleopSubstation2LowPickups}
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
                error={errors.teleopSubstation2HighPickups}
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
        </StackValidationChecker>
    );
};