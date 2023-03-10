import {
    Checkbox,
    Divider,
    NumberInput,
    Select,
    Text,
    Title,
} from "@mantine/core";
import { FC } from "react";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActivePit } from "../../stores/pit/activePit";
import { DrivetrainType } from "../../stores/pit/pitTypes";
import { useActivePitErrors } from "../../stores/pit/useActivePitErrors";

export const Robot: FC = () => {
    const set = useActivePit((state) => state.set);
    const {
        robotHeight,
        robotLength,
        robotWidth,
        robotWeight,
        robotDrivetrain,
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

    const errors = useActivePitErrors();

    return (
        <StackValidationChecker>
            <Title align="center">Robot Information</Title>

            <NumberInput
                value={robotLength}
                onChange={(value) => set("robotLength")(value ?? 0)}
                error={errors.robotLength}
                placeholder="Length"
                label="Length"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotWidth}
                onChange={(value) => set("robotWidth")(value ?? 0)}
                error={errors.robotWidth}
                placeholder="Width"
                label="Width"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotHeight}
                onChange={(value) => set("robotHeight")(value ?? 0)}
                error={errors.robotHeight}
                placeholder="Height"
                label="Height"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotWeight}
                onChange={(value) => set("robotWeight")(value ?? 0)}
                error={errors.robotWeight}
                placeholder="Weight"
                label="Weight"
                size="lg"
                my={4}
            />

            <Select
                label={"What type of drivetrain do you have?"}
                size="lg"
                searchable
                data={DrivetrainType().options}
                value={robotDrivetrain}
                onChange={set("robotDrivetrain")}
                my={4}
                error={errors.robotDrivetrain}
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
                error={errors.robotCanManipulateCone}
            />
            <Checkbox
                label="Cube"
                size="lg"
                my={4}
                checked={robotCanManipulateCube}
                onChange={(event) => {
                    set("robotCanManipulateCube")(event.target.checked);
                }}
                error={errors.robotCanManipulateCube}
            />

            <Divider my="xs" variant="dashed" />

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
                error={errors.robotCanPickupRamp}
            />
            <Checkbox
                label="Shelf"
                size="lg"
                my={4}
                checked={robotCanPickupShelf}
                onChange={(event) => {
                    set("robotCanPickupShelf")(event.target.checked);
                }}
                error={errors.robotCanPickupShelf}
            />
            <Checkbox
                label="Floor"
                size="lg"
                my={4}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
                error={errors.robotCanPickupFloor}
            />

            <Divider my="xs" variant="dashed" />

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
                error={errors.robotCanDockAuto}
            />
            <Checkbox
                label="Teleop"
                size="lg"
                my={4}
                checked={robotCanDockTeleop}
                onChange={(event) => {
                    set("robotCanDockTeleop")(event.target.checked);
                }}
                error={errors.robotCanDockTeleop}
            />

            <Divider my="xs" variant="dashed" />

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
                error={errors.robotCanEngageAuto}
            />
            <Checkbox
                label="Teleop"
                size="lg"
                my={4}
                checked={robotCanEngageTeleop}
                onChange={(event) => {
                    set("robotCanEngageTeleop")(event.target.checked);
                }}
                error={errors.robotCanEngageTeleop}
            />
        </StackValidationChecker>
    );
};
