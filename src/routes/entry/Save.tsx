import { Button, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useActiveMatch } from "../../stores/activeMatch";
import { useMatchDB } from "../../stores/matchDB";

export const Save: FC = () => {
    const pushToDB = useMatchDB((state) => state.push);
    const saveActiveMatch = useActiveMatch((state) => state.save);
    const resetActiveMatch = useActiveMatch((state) => state.reset);

    return (
        <Stack>
            <Title>Save</Title>
            <Button>Save</Button>

            <Link to={"/save"} style={{ all: "unset" }}>
                <Button
                    fullWidth
                    onClick={() => {
                        pushToDB(saveActiveMatch());

                        resetActiveMatch();
                    }}
                >
                    Save
                </Button>
            </Link>
        </Stack>
    );
};
