import { Checkbox, Radio, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { FieldInput } from "../../components/FieldInput";
import { GridInput } from "../../components/GridInput";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { AutoParkState, MatchState } from "../../stores/match/matchTypes";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useTeamDB } from "../../stores/thebluealliance/teamDB";
import { SimpleGridInput } from "../../components/SimpleGridInput";

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

            <Text size="lg">Starting Position</Text>
            <FieldInput
                onChange={(data) => set("autonomousStartingLocation")(data[0])}
                singlePoint
                data={
                    autonomousStartingLocation
                        ? [autonomousStartingLocation]
                        : [{ x: 0.5, y: 0.5 }]
                }
            />
            <Checkbox
                label="Left Community Zone"
                size="lg"
                my={8}
                checked={autonomousLeftCommunityZone}
                onChange={(event) =>
                    set("autonomousLeftCommunityZone")(event.target.checked)
                }
                error={errors.autonomousLeftCommunityZone}
            />
            <Text size="lg">Grid</Text>
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
                <Radio
                    value={AutoParkState().enum.None}
                    label="None"
                    size="lg"
                    m={4}
                />
            </Radio.Group>
        </StackValidationChecker>
    );
};
