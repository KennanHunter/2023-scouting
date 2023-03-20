import { Checkbox, Divider, Title, Text } from "@mantine/core";
import { FC } from "react";
import { SimpleGridInput } from "../../components/SimpleGridInput";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";
import { useTeamDB } from "../../stores/thebluealliance/teamDB";

export const Teleop: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        matchNumber,
        teleopGroundPickups,
        teleopSubstation1Pickups,
        teleopSubstation2LowPickups,
        teleopSubstation2HighPickups,
        teleopGridData,
        teleopRunnerRobot,
    } = useActiveMatch((state) => state);

    const errors = useActiveMatchErrors();

    const teamNumber = useTeamDB((state) => state.getTeamNumber)(matchNumber);

    return (
        <StackValidationChecker>
            <Title align="center">
                Teleop {teamNumber ? `for Team ${teamNumber}` : ""}
            </Title>

            <Text size="lg">Pickup Locations</Text>

            <Checkbox
                checked={!!teleopGroundPickups}
                onChange={(event) =>
                    set("teleopGroundPickups")(
                        event.currentTarget.checked ? 1 : 0 ?? 0
                    )
                }
                error={errors.teleopGroundPickups}
                placeholder="Floor"
                label="Floor"
                size="lg"
                my={4}
            />

            {/* <NumberInput
                value={teleopSubstation2LowPickups}
                onChange={(value) =>
                    set("teleopSubstation2LowPickups")(value ?? 0)
                }
                error={errors.teleopSubstation2LowPickups}
                placeholder="Substation 2 Low Pickups"
                label="Substation 2 Low Pickups"
                size="lg"
                my={4}
            /> */}

            <Checkbox
                checked={!!teleopSubstation2HighPickups}
                onChange={(event) =>
                    set("teleopSubstation2HighPickups")(
                        event.currentTarget.checked ? 1 : 0 ?? 0
                    )
                }
                error={errors.teleopSubstation2HighPickups}
                placeholder="Shelf"
                label="Shelf"
                size="lg"
                my={4}
            />

            <Checkbox
                checked={!!teleopSubstation1Pickups}
                onChange={(event) =>
                    set("teleopSubstation1Pickups")(
                        event.currentTarget.checked ? 1 : 0 ?? 0
                    )
                }
                error={errors.teleopSubstation1Pickups}
                placeholder="Ramp"
                label="Ramp"
                size="lg"
                my={4}
            />

            <Divider />

            <Checkbox
                label="Runner Robot"
                size="lg"
                my={8}
                checked={teleopRunnerRobot}
                onChange={(event) => {
                    set("teleopRunnerRobot")(event.target.checked);
                }}
                error={errors.teleopRunnerRobot}
            />

            <SimpleGridInput
                onChange={(data) => set("teleopGridData")(data)}
                data={teleopGridData}
            />
        </StackValidationChecker>
    );
};
