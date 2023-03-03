import { NumberInput, Select, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { scouterOptions } from "../../data/scouters";
import { useActivePit } from "../../stores/pit/activePit";

export const Meta: FC = () => {
    const set = useActivePit((state) => state.set);
    const { scouter, teamNumber } = useActivePit((state) => state);

    return (
        <Stack>
            <Title align="center">Pit Information</Title>

            <Select
                label={"Scouter"}
                size="lg"
                searchable
                data={scouterOptions}
                value={scouter}
                onChange={set("scouter")}
                my={4}
            />

            <NumberInput
                value={teamNumber}
                onChange={(value) => set("teamNumber")(value ?? 0)}
                error={
                    teamNumber <= 0 ? "You must set a team number!" : undefined
                }
                placeholder="Team Number"
                label="Team Number"
                size="lg"
                my={4}
            />
        </Stack>
    );
};
