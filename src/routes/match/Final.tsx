import { Button, Divider, Stack, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { FC } from "react";
import { Link, useMatch } from "react-router-dom";
import { MadyCSV } from "../../data/formats/MadyCSV";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { useMatchDB } from "../../stores/match/matchDB";
import { MatchState } from "../../stores/match/matchTypes";

const computeFiles = (matchDB: MatchState[]) => {
    const time = new Date();
    const dateString = `${time.getMonth()}-${time.getDay()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;

    return [
        new File([MadyCSV.match.blobify(matchDB)], `data-${dateString}.csv`, {
            type: "text/csv",
        }),
    ];
};

export const Final: FC = () => {
    const setMatchNumber = useActiveMatch((state) => state.set("matchNumber"));
    const sharingSupported: boolean =
        navigator.canShare &&
        navigator.canShare({
            files: [
                new File([""], `shim.csv`, {
                    type: "text/csv",
                }),
            ],
        });

    return (
        <Stack>
            <Title align="center">Download Data</Title>
            {sharingSupported ? (
                <Button
                    fullWidth
                    onClick={() => {
                        navigator
                            .share({
                                files: computeFiles(useMatchDB.getState().db),
                                title: "Share CSV",
                            })
                            .then(() => {
                                showNotification({
                                    message: "Sharing completed",
                                });
                            });
                    }}
                >
                    Share
                </Button>
            ) : (
                <Text>File sharing not supported</Text>
            )}

            <Divider />

            <Link to={"/match/meta"} style={{ all: "unset" }}>
                <Button
                    onClick={() =>
                        setMatchNumber(
                            useMatchDB.getState().db.at(-1)?.matchNumber ||
                                -1 + 1
                        )
                    }
                    fullWidth
                    my={4}
                >
                    Scout next match
                </Button>
            </Link>

            <Link to={"/"} style={{ all: "unset" }}>
                <Button fullWidth my={4}>
                    Return to home
                </Button>
            </Link>
        </Stack>
    );
};
