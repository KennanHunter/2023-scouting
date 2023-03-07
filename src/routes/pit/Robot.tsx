import { Checkbox, NumberInput, Stack, Text, Title, Divider } from "@mantine/core";
import { FC } from "react";
import { useActivePit } from "../../stores/pit/activePit";

export const Robot: FC = () => {
    const set = useActivePit((state) => state.set);
    const {
        robotHeight,
        robotLength,
        robotWidth,
        robotWeight,
        robotCanPickupFloor,
        robotCanPickupRamp,
        robotCanPickupShelf,
        robotCanManipulateCone,
        robotCanManipulateCube,
        robotCanDockAuto,
        robotCanDockTeleop,
        robotCanEngageAuto,
        robotCanEngageTeleop,
    } = useActivePit((state) => state);

    return (
        <Stack>
            <Title align="center">Robot Information</Title>

            <NumberInput
                value={robotLength}
                onChange={(value) => set("robotLength")(value ?? 0)}
                error={
                    robotLength < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Length"
                label="Length"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotWidth}
                onChange={(value) => set("robotWeight")(value ?? 0)}
                error={
                    robotWidth < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Width"
                label="Width"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotHeight}
                onChange={(value) => set("robotHeight")(value ?? 0)}
                error={
                    robotHeight < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Height"
                label="Height"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotWeight}
                onChange={(value) => set("robotWeight")(value ?? 0)}
                error={
                    robotWeight < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Weight"
                label="Weight"
                size="lg"
                my={4}
            />

            <Text size="lg" mt={8}>
                What game pieces can you hold?
            </Text>
            <Checkbox
                label="Cone"
                size="lg"
                my={4}
                checked={robotCanManipulateCone}
                onChange={(event) => {
                    set("robotCanManipulateCone")(event.target.checked);
                }}
            />
            <Checkbox
                label="Cube"
                size="lg"
                my={4}
                checked={robotCanManipulateCube}
                onChange={(event) => {
                    set("robotCanManipulateCube")(event.target.checked);
                }}
            />

            <Divider my="xs" variant="dashed"/>

            <Text size="lg" mt={8}>
                Where do you get game pieces?
            </Text>
            <Checkbox
                label="Ramp"
                size="lg"
                my={4}
                checked={robotCanPickupRamp}
                onChange={(event) => {
                    set("robotCanPickupRamp")(event.target.checked);
                }}
            />
            <Checkbox
                label="Shelf"
                size="lg"
                my={4}
                checked={robotCanPickupShelf}
                onChange={(event) => {
                    set("robotCanPickupShelf")(event.target.checked);
                }}
            />
            <Checkbox
                label="Floor"
                size="lg"
                my={4}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />

            <Divider my="xs" variant="dashed"/>

            <Text size="lg" mt={8}>
                Can you dock in:
            </Text>
            <Checkbox
                label="Auto"
                size="lg"
                my={4}
                checked={robotCanDockAuto}
                onChange={(event) => {
                    set("robotCanDockAuto")(event.target.checked);
                }}
            />
            <Checkbox
                label="Teleop"
                size="lg"
                my={4}
                checked={robotCanDockTeleop}
                onChange={(event) => {
                    set("robotCanDockTeleop")(event.target.checked);
                }}
            />

            <Divider my="xs" variant="dashed"/>

            <Text size="lg" mt={8}>
                Can you engage in:
            </Text>
            <Checkbox
                label="Auto"
                size="lg"
                my={4}
                checked={robotCanEngageAuto}
                onChange={(event) => {
                    set("robotCanEngageAuto")(event.target.checked);
                }}
            />
            <Checkbox
                label="Teleop"
                size="lg"
                my={4}
                checked={robotCanEngageTeleop}
                onChange={(event) => {
                    set("robotCanEngageTeleop")(event.target.checked);
                }}
            />
        </Stack>
    );
};
