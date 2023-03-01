import { Button, Select, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { scouterOptions } from "../data/scouters";
import { useActiveMatch } from "../stores/activeMatch";

export const Meta: FC = () => {
    const scouter = useActiveMatch((state) => state.scouter);
    const setScouter = useActiveMatch((state) => state.setScouter);

    return (
        <Stack>
            <Title align="center">Meta Data</Title>
            <Select
                label={"Scouter"}
                searchable
                data={scouterOptions}
                value={scouter}
                onChange={setScouter}
            />
            <Link to={"/start"} style={{ all: "unset" }}>
                <Button fullWidth>Start</Button>
            </Link>
        </Stack>
    );
};
