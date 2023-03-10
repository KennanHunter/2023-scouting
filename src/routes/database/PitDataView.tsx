import {
    Checkbox,
    Divider,
    NumberInput,
    Select,
    Tabs,
    Text,
    Textarea,
} from "@mantine/core";
import { FC } from "react";
import { DrivetrainType, PitState } from "../../stores/pit/pitTypes";

type PitDataViewParams = {
    pit: PitState;
};

export const PitDataView: FC<PitDataViewParams> = ({ pit }) => {
    return (
        <>
            <Tabs.Panel value="robot" pt="xs">
                <NumberInput
                    value={pit.robotLength}
                    placeholder="Length"
                    label="Length"
                    size="lg"
                    my={4}
                />

                <NumberInput
                    value={pit.robotWidth}
                    placeholder="Width"
                    label="Width"
                    size="lg"
                    my={4}
                />

                <NumberInput
                    value={pit.robotHeight}
                    placeholder="Height"
                    label="Height"
                    size="lg"
                    my={4}
                />

                <NumberInput
                    value={pit.robotWeight}
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
                    value={pit.robotDrivetrain}
                    my={4}
                />

                <Text size="lg" mt={8}>
                    What game pieces can you hold?
                </Text>
                <Checkbox
                    label="Cone"
                    size="lg"
                    my={4}
                    checked={pit.robotCanManipulateCone}
                />
                <Checkbox
                    label="Cube"
                    size="lg"
                    my={4}
                    checked={pit.robotCanManipulateCube}
                />

                <Divider my="xs" variant="dashed" />

                <Text size="lg" mt={8}>
                    Where do you get game pieces?
                </Text>
                <Checkbox
                    label="Ramp"
                    size="lg"
                    my={4}
                    checked={pit.robotCanPickupRamp}
                />
                <Checkbox
                    label="Shelf"
                    size="lg"
                    my={4}
                    checked={pit.robotCanPickupShelf}
                />
                <Checkbox
                    label="Floor"
                    size="lg"
                    my={4}
                    checked={pit.robotCanPickupFloor}
                />

                <Divider my="xs" variant="dashed" />

                <Text size="lg" mt={8}>
                    Can you dock in:
                </Text>
                <Checkbox
                    label="Auto"
                    size="lg"
                    my={4}
                    checked={pit.robotCanDockAuto}
                />
                <Checkbox
                    label="Teleop"
                    size="lg"
                    my={4}
                    checked={pit.robotCanDockTeleop}
                />

                <Divider my="xs" variant="dashed" />

                <Text size="lg" mt={8}>
                    Can you engage in:
                </Text>
                <Checkbox
                    label="Auto"
                    size="lg"
                    my={4}
                    checked={pit.robotCanEngageAuto}
                />
                <Checkbox
                    label="Teleop"
                    size="lg"
                    my={4}
                    checked={pit.robotCanEngageTeleop}
                />
            </Tabs.Panel>

            <Tabs.Panel value="auto" pt="xs">
                <Checkbox
                    label="Can you exit the community?"
                    size="lg"
                    my={8}
                    checked={pit.autonomousCanExitCommunity}
                />

                <Text size="lg" mt={8}>
                    Where do you place game pieces?
                </Text>
                <Checkbox
                    label="Top"
                    size="lg"
                    my={4}
                    checked={pit.autonomousGridPlaceTop}
                />
                <Checkbox
                    label="Middle"
                    size="lg"
                    my={4}
                    checked={pit.autonomousGridPlaceMiddle}
                />
                <Checkbox
                    label="Bottom"
                    size="lg"
                    my={4}
                    checked={pit.autonomousGridPlaceBottom}
                />

                <Divider my="xs" variant="dashed" />

                <NumberInput
                    value={pit.autonomousNumberOfPrograms}
                    placeholder="Number of Auto Programs"
                    label="Number of Auto Programs"
                    size="lg"
                    my={4}
                />
            </Tabs.Panel>

            <Tabs.Panel value="teleop" pt="xs">
                <Text size="lg" mt={8}>
                    Where do you place game pieces?
                </Text>
                <Checkbox
                    label="Top"
                    size="lg"
                    my={4}
                    checked={pit.teleopGridPlaceTop}
                />
                <Checkbox
                    label="Middle"
                    size="lg"
                    my={4}
                    checked={pit.teleopGridPlaceMiddle}
                />
                <Checkbox
                    label="Bottom"
                    size="lg"
                    my={4}
                    checked={pit.teleopGridPlaceBottom}
                />
                <Divider my="xs" variant="dashed" />

                <Checkbox
                    label="Do you play defense?"
                    size="lg"
                    my={8}
                    checked={pit.teleopPlaysDefense}
                />
                <Checkbox
                    label="Do you scavange/run pieces?"
                    size="lg"
                    my={8}
                    checked={pit.teleopRunnerRobot}
                />

                <Textarea
                    value={pit.comments}
                    label="Comments"
                    size="lg"
                    my={4}
                />
            </Tabs.Panel>
        </>
    );
};
