import { Select, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { scouterOptions } from "../data/scouters";

export const Meta: FC = () => {
    return (
        <Stack>
            <Title>Meta Data</Title>

            <Select label={"Scouter"} searchable data={scouterOptions}></Select>
        </Stack>
    );
};
