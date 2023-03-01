import { Stack } from "@mantine/core";
import { FC } from "react";
import { FieldInput } from "../components/FieldInput";

export const Start: FC = () => {
    return (
        <Stack>
            <h1>Match Start</h1>
            <FieldInput onePoint onChange={() => {}} data={[]} />
        </Stack>
    );
};
