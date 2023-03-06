import { Button, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { usePitDB } from "../../stores/pit/pitDB";
import { useActivePit } from "../../stores/pit/activePit";

export const Save: FC = () => {
    const pushToDB = usePitDB((state) => state.push);
    const saveActivePit = useActivePit((state) => state.save);
    const resetActivePit = useActivePit((state) => state.clear);

    return (
        <Stack>
            <Title align="center">Save</Title>

            <Link to={"/pit/meta"} style={{ all: "unset" }}>
                <Button
                    fullWidth
                    onClick={() => {
                        pushToDB(saveActivePit());

                        resetActivePit();
                    }}
                    my={4}
                >
                    Save and Reset
                </Button>
            </Link>

            <Link to={"/"} style={{ all: "unset" }}>
                <Button
                    fullWidth
                    onClick={() => {
                        pushToDB(saveActivePit());

                        resetActivePit();
                    }}
                    my={4}
                >
                    Save and Go Home
                </Button>
            </Link>
        </Stack>
    );
};
