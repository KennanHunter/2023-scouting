import { Checkbox, NumberInput, Stack, Text, Title } from "@mantine/core";
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
    } = useActivePit((state) => state);

    return (
        <Stack>
            <Title align="center">Pit</Title>

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
                value={robotLength}
                onChange={(value) => set("robotLength")(value ?? 0)}
                error={
                    robotLength < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Substation 2 Low Pickups"
                label="Substation 2 Low Pickups"
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
            <Checkbox
                label="Pickup from Ramp"
                size="lg"
                my={8}
                checked={robotCanPickupRamp}
                onChange={(event) => {
                    set("robotCanPickupRamp")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Shelf"
                size="lg"
                my={8}
                checked={robotCanPickupShelf}
                onChange={(event) => {
                    set("robotCanPickupShelf")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Floor"
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
            <Checkbox
                label="Place to "
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Floor"
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Floor"
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
        </Stack>
    );
};
