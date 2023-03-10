import { Checkbox, Divider, Text, Textarea, Title } from "@mantine/core";
import { FC } from "react";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActivePit } from "../../stores/pit/activePit";
import { useActivePitErrors } from "../../stores/pit/useActivePitErrors";

export const Meta: FC = () => {
    const set = useActivePit((state) => state.set);
    const {
        teleopGridPlaceTop,
        teleopGridPlaceMiddle,
        teleopGridPlaceBottom,
        teleopPlaysDefense,
        teleopRunnerRobot,
        comments,
    } = useActivePit((state) => state);

    const errors = useActivePitErrors();

    return (
        <StackValidationChecker>
            <Title align="center">Teleop Abilities</Title>

            <Text size="lg" mt={8}>
                Where do you place game pieces?
            </Text>
            <Checkbox
                label="Top"
                size="lg"
                my={4}
                checked={teleopGridPlaceTop}
                onChange={(event) => {
                    set("teleopGridPlaceTop")(event.target.checked);
                }}
                error={errors.teleopGridPlaceTop}
            />
            <Checkbox
                label="Middle"
                size="lg"
                my={4}
                checked={teleopGridPlaceMiddle}
                onChange={(event) => {
                    set("teleopGridPlaceMiddle")(event.target.checked);
                }}
                error={errors.teleopGridPlaceMiddle}
            />
            <Checkbox
                label="Bottom"
                size="lg"
                my={4}
                checked={teleopGridPlaceBottom}
                onChange={(event) => {
                    set("teleopGridPlaceBottom")(event.target.checked);
                }}
                error={errors.teleopGridPlaceBottom}
            />
            <Divider my="xs" variant="dashed" />

            <Checkbox
                label="Do you play defense?"
                size="lg"
                my={8}
                checked={teleopPlaysDefense}
                onChange={(event) => {
                    set("teleopPlaysDefense")(event.target.checked);
                }}
                error={errors.teleopPlaysDefense}
            />
            <Checkbox
                label="Do you scavange/run pieces?"
                size="lg"
                my={8}
                checked={teleopRunnerRobot}
                onChange={(event) => {
                    set("teleopRunnerRobot")(event.target.checked);
                }}
                error={errors.teleopRunnerRobot}
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
