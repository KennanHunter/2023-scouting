import { Select, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { scouterOptions } from "../../data/scouters";
import { useActiveMatch } from "../../stores/activeMatch";

export const Meta: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const { scouter } = useActiveMatch((state) => state);

    return (
        <Stack>
            <Title align="center">Match Information</Title>

            <Select
                label={"Scouter"}
                searchable
                data={scouterOptions}
                value={scouter}
                onChange={set("scouter")}
            />
        </Stack>
    );
};
