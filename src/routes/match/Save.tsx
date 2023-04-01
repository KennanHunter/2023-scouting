import { Button, Divider, Loader, Stack, Text, Title } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { MadyCSV } from "../../data/formats/MadyCSV";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { useMatchDB } from "../../stores/match/matchDB";

export const Save: FC = () => {
    const pushToDB = useMatchDB((state) => state.push);
    const matchDB = useMatchDB((state) => state.db);
    const saveActiveMatch = useActiveMatch((state) => state.save);
    const resetActiveMatch = useActiveMatch((state) => state.clear);

    const files: File[] = useMemo(() => {
        const time = new Date();
        const dateString = `${time.getMonth()}-${time.getDay()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;

        return [
            new File(
                [MadyCSV.match.blobify(matchDB)],
                `data-${dateString}.csv`,
                {
                    type: "text/csv",
                }
            ),
        ];
    }, [matchDB]);

    return (
        <Stack>
            <Title align="center">Download Data</Title>
            {navigator.canShare && navigator.canShare({ files }) ? (
                <Button
                    fullWidth
                    onClick={() => {
                        pushToDB(saveActiveMatch());

                        resetActiveMatch();

                        openModal({
                            modalId: "Share-Loader",
                            children: <Loader />,
                        });

                        navigator
                            .share({ files })
                            .then(() => {
                                showNotification({
                                    message: "Sharing completed",
                                });
                            })
                            .finally(() => {
                                closeModal("Share-Loader");
                            });
                    }}
                >
                    Share (MadyCSV)
                </Button>
            ) : (
                <Text>File sharing not supported</Text>
            )}

            <Divider />

            <Link to={"/match/meta"} style={{ all: "unset" }}>
                <Button
                    fullWidth
                    onClick={() => {
                        pushToDB(saveActiveMatch());

                        resetActiveMatch();
                    }}
                    my={4}
                >
                    Save and Clear Form
                </Button>
            </Link>

            <Link to={"/"} style={{ all: "unset" }}>
                <Button
                    fullWidth
                    onClick={() => {
                        pushToDB(saveActiveMatch());

                        resetActiveMatch();
                    }}
                    my={4}
                >
                    Home
                </Button>
            </Link>
        </Stack>
    );
};
