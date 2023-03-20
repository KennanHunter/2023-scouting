import { Checkbox, Radio, Title } from "@mantine/core";
import { FC } from "react";
import { SimpleGridInput } from "../../components/SimpleGridInput";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { AutoParkState } from "../../stores/match/matchTypes";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";
import { useTeamDB } from "../../stores/thebluealliance/teamDB";

export const Auto: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        matchNumber,
        autonomousParking,
        autonomousGridData,
        autonomousLeftCommunityZone,
        autonomousStartingLocation,
    } = useActiveMatch((state) => state);

    const errors = useActiveMatchErrors();

    const teamNumber = useTeamDB((state) => state.getTeamNumber)(matchNumber);

    return (
        <StackValidationChecker>
            <Title align="center">
                Auto {teamNumber ? `for Team ${teamNumber}` : ""}
            </Title>

            {/* <Text size="lg">Starting Position</Text>
            <FieldInput
                onChange={(data) => set("autonomousStartingLocation")(data[0])}
                singlePoint
                data={
                    autonomousStartingLocation
                        ? [autonomousStartingLocation]
                        : [{ x: 0.5, y: 0.5 }]
                }
            /> */}

            <Checkbox
                label="Left Community"
                size="lg"
                my={8}
                checked={autonomousLeftCommunityZone}
                onChange={(event) =>
                    set("autonomousLeftCommunityZone")(event.target.checked)
                }
                error={errors.autonomousLeftCommunityZone}
            />
            <SimpleGridInput
                onChange={(data) => set("autonomousGridData")(data)}
                data={autonomousGridData}
            />

            <Radio.Group
                label="Parking"
                my={4}
                onChange={(value) =>
                    set("autonomousParking")(value as AutoParkState)
                }
                value={autonomousParking}
                error={errors.autonomousParking}
            >
                <Radio
                    value={AutoParkState().enum.None}
                    label="None"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={AutoParkState().enum.DockEngage}
                    label="Docked + Engaged"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={AutoParkState().enum.Dock}
                    label="Docked Only"
                    size="lg"
                    m={4}
                />
            </Radio.Group>
        </StackValidationChecker>
    );
};
