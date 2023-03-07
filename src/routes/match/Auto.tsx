import { Checkbox, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { FieldInput } from "../../components/FieldInput";
import { GridInput } from "../../components/GridInput";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { MatchState } from "../../stores/match/matchTypes";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";
import { StackValidationChecker } from "../../components/StackValidationChecker";

export const Auto: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        autonomousChargeStationEngaged,
        autonomousDockedToChargeStation,
        autonomousGridData,
        autonomousLeftCommunityZone,
        autonomousStartingLocation,
    } = useActiveMatch((state) => state);

    const errors = useActiveMatchErrors();

    return (
        <StackValidationChecker>
            <Title align="center">Auto</Title>

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
                onChange={(event) => {
                    set("autonomousLeftCommunityZone")(event.target.checked);
                }}
                error={errors.autonomousLeftCommunityZone}
            />
            <Text size="lg">Grid</Text>
            <GridInput
                onChange={(data) => set("autonomousGridData")(data)}
                data={autonomousGridData}
            />

            <Checkbox
                label="Docked to Charge Station"
                size="lg"
                my={8}
                checked={autonomousDockedToChargeStation}
                onChange={(event) => {
                    set("autonomousDockedToChargeStation")(
                        event.target.checked
                    );
                }}
                error={errors.autonomousDockedToChargeStation}
            />
            <Checkbox
                label="Charging Station Engaged"
                size="lg"
                my={8}
                checked={autonomousChargeStationEngaged}
                onChange={(event) => {
                    set("autonomousChargeStationEngaged")(event.target.checked);
                }}
                error={errors.autonomousChargeStationEngaged}
            />
        </StackValidationChecker>
    );
};
