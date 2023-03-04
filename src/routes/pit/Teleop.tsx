import { Checkbox, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { useActivePit } from "../../stores/pit/activePit";

export const Meta: FC = () => {
    const set = useActivePit((state) => state.set);
    const {
        teleopGridPlaceTop,
        teleopGridPlaceMiddle,
        teleopGridPlaceBottom,
        teleopPlaysDefense,
        teleopRunnerRobot,
    } = useActivePit((state) => state);

    return (
        <Stack>
            <Title align="center">Teleop Abilities</Title>

            <Text size="lg" mt={8}>
                Where do you place game pieces?
            </Text>
            <Checkbox
                label="Top"
                size="lg"
                my={0}
                checked={teleopGridPlaceTop}
                onChange={(event) => {
                    set("teleopGridPlaceTop")(event.target.checked);
                }}
            />
            <Checkbox
                label="Middle"
                size="lg"
                my={0}
                checked={teleopGridPlaceMiddle}
                onChange={(event) => {
                    set("teleopGridPlaceMiddle")(event.target.checked);
                }}
            />
            <Checkbox
                label="Bottom"
                size="lg"
                mb={8}
                checked={teleopGridPlaceBottom}
                onChange={(event) => {
                    set("teleopGridPlaceBottom")(event.target.checked);
                }}
            />
            <Checkbox
                label="Do you play defense?"
                size="lg"
                my={8}
                checked={teleopPlaysDefense}
                onChange={(event) => {
                    set("teleopPlaysDefense")(event.target.checked);
                }}
            />
            <Checkbox
                label="Do you scavange/run pieces?"
                size="lg"
                my={8}
                checked={teleopRunnerRobot}
                onChange={(event) => {
                    set("teleopRunnerRobot")(event.target.checked);
                }}
            />
        </Stack>
    );
};
