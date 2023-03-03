import { Button, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { sendUnimplemented } from "../util/unimplemented";

export const Home: FC = () => {
    return (
        <Stack>
            <Title align="center">Home</Title>
            <Link
                to={"/match/meta"}
                style={{
                    all: "inherit",
                }}
            >
                <Button fullWidth p={"xs"} my={"sm"}>
                    Create new MATCH scout entry
                </Button>
            </Link>
            <Link
                to={"/pit/meta"}
                style={{
                    all: "inherit",
                }}
            >
                <Button fullWidth p={"xs"} my={"sm"}>
                    Create new PIT scout entry
                </Button>
            </Link>
            <Link
                to={"/database/viewdata"}
                style={{
                    all: "inherit",
                }}
            >
                <Button fullWidth p={"xs"} my={"sm"}>
                    View local data
                </Button>
            </Link>
        </Stack>
    );
};
