import { NumberInput, Select, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { scouterOptions } from "../../data/scouters";
import { useActivePit } from "../../stores/pit/activePit";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActivePitErrors } from "../../stores/pit/useActivePitErrors";

export const Meta: FC = () => {
    const set = useActivePit((state) => state.set);
    const { scouter, teamNumber } = useActivePit((state) => state);

    const errors = useActivePitErrors();

    return (
        <StackValidationChecker>
            <Title align="center">Pit Information</Title>

            <Select
                label={"Scouter"}
                size="lg"
                searchable
                data={scouterOptions}
                value={scouter}
                onChange={set("scouter")}
                my={4}
                error={errors.scouter}
            />

            <NumberInput
                value={teamNumber}
                onChange={(value) => set("teamNumber")(value ?? 0)}
                error={errors.teamNumber}
                placeholder="Team Number"
                label="Team Number"
                size="lg"
                my={4}
            />
        </StackValidationChecker>
    );
};
