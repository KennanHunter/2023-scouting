import { Checkbox, NumberInput, Stack, Title, Text } from "@mantine/core";
import { FC } from "react";
import { useActivePit } from "../../stores/pit/activePit";

export const Meta: FC = () => {
    const set = useActivePit((state) => state.set);
    const {
        autonomousCanExitCommunity,
        autonomousGridPlaceBottom,
        autonomousGridPlaceMiddle,
        autonomousGridPlaceTop,
        autonomousNumberOfPrograms,
    } = useActivePit((state) => state);

    return (
        <Stack>
            <Title align="center">Auto Abilities</Title>

            <Checkbox
                label="Can you exit the community?"
                size="lg"
                my={8}
                checked={autonomousCanExitCommunity}
                onChange={(event) => {
                    set("autonomousCanExitCommunity")(event.target.checked);
                }}
            />

            <Text size="lg" mt={8}>
                Where do you place game pieces?
            </Text>
            <Checkbox
                label="Top"
                size="lg"
                my={0}
                checked={autonomousGridPlaceTop}
                onChange={(event) => {
                    set("autonomousGridPlaceTop")(event.target.checked);
                }}
            />
            <Checkbox
                label="Middle"
                size="lg"
                my={0}
                checked={autonomousGridPlaceMiddle}
                onChange={(event) => {
                    set("autonomousGridPlaceMiddle")(event.target.checked);
                }}
            />
            <Checkbox
                label="Bottom"
                size="lg"
                my={0}
                checked={autonomousGridPlaceBottom}
                onChange={(event) => {
                    set("autonomousGridPlaceBottom")(event.target.checked);
                }}
            />

            <NumberInput
                value={autonomousNumberOfPrograms}
                onChange={(value) =>
                    set("autonomousNumberOfPrograms")(value ?? 0)
                }
                error={
                    autonomousNumberOfPrograms < 0
                        ? "Value cannot be less than 0!"
                        : undefined
                }
                placeholder="Number of Auto Programs"
                label="Number of Auto Programs"
                size="lg"
                my={4}
            />
        </Stack>
    );
};
