import { Checkbox, Divider, Text, Title } from "@mantine/core";
import { FC } from "react";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { StepperInput } from "../../components/StepperInput";
import { useActivePit } from "../../stores/pit/activePit";
import { useActivePitErrors } from "../../stores/pit/useActivePitErrors";

export const Meta: FC = () => {
    const set = useActivePit((state) => state.set);
    const {
        autonomousCanExitCommunity,
        autonomousGridPlaceBottom,
        autonomousGridPlaceMiddle,
        autonomousGridPlaceTop,
        autonomousNumberOfPrograms,
    } = useActivePit((state) => state);

    const errors = useActivePitErrors();

    return (
        <StackValidationChecker>
            <Title align="center">Auto Abilities</Title>

            <Checkbox
                label="Exit Community?"
                size="lg"
                my={8}
                checked={autonomousCanExitCommunity}
                onChange={(event) => {
                    set("autonomousCanExitCommunity")(event.target.checked);
                }}
                error={errors.autonomousCanExitCommunity}
            />

            <Text size="lg" mt={8}>
                Grid Locations
            </Text>
            <Checkbox
                label="Top"
                size="lg"
                my={4}
                checked={autonomousGridPlaceTop}
                onChange={(event) => {
                    set("autonomousGridPlaceTop")(event.target.checked);
                }}
                error={errors.autonomousGridPlaceTop}
            />
            <Checkbox
                label="Middle"
                size="lg"
                my={4}
                checked={autonomousGridPlaceMiddle}
                onChange={(event) => {
                    set("autonomousGridPlaceMiddle")(event.target.checked);
                }}
                error={errors.autonomousGridPlaceMiddle}
            />
            <Checkbox
                label="Bottom"
                size="lg"
                my={4}
                checked={autonomousGridPlaceBottom}
                onChange={(event) => {
                    set("autonomousGridPlaceBottom")(event.target.checked);
                }}
                error={errors.autonomousGridPlaceBottom}
            />

            <Divider my="xs" variant="dashed" />

            <StepperInput
                value={autonomousNumberOfPrograms}
                onChange={(value) =>
                    set("autonomousNumberOfPrograms")(value ?? 0)
                }
                error={errors.autonomousNumberOfPrograms}
                placeholder="# Auto Programs"
                label="# Auto Programs"
                size="lg"
                my={4}
            />
        </StackValidationChecker>
    );
};
