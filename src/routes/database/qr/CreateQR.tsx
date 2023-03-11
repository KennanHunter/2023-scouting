import { Button, Pagination, Stack, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { FC, useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { JSONGzip } from "../../../data/formats/JSONGzip";
import { useMatchDB } from "../../../stores/match/matchDB";
import { usePitDB } from "../../../stores/pit/pitDB";

export const CreateQR: FC = () => {
    const pitDB = usePitDB((state) => state.db);
    const matchDB = useMatchDB((state) => state.db);

    const [activePage, setPage] = useState<number | undefined>();
    const [usingMatchDB, setUsingMatchDB] = useState<boolean>(true);

    const entriesPerQRCode = 10;

    const openQRCodeModal = useCallback(
        () =>
            openModal({
                title: `Scan ${usingMatchDB ? "Match" : "Pit"} QR Codes`,
                centered: true,
                onClose: () => setPage(undefined),
                size: "min(100vw, 50vh)",
                children: (
                    <Stack align="center">
                        <Title mb={16}>Page {activePage}</Title>

                        <QRCode
                            style={{
                                borderWidth: 16,
                                borderStyle: "solid",
                                borderColor: "white",
                                height: "min(100vw, 50vh)",
                                width: "min(100vw, 50vh)",
                                backgroundColor: "white",
                            }}
                            level="H"
                            value={(() => {
                                if (!activePage)
                                    throw new Error(
                                        "Active page not initialized in qr code call"
                                    );

                                const startIndex =
                                    (activePage - 1) * entriesPerQRCode;
                                const endIndex = startIndex + entriesPerQRCode;

                                if (usingMatchDB) {
                                    return new TextDecoder().decode(
                                        JSONGzip.match.stringify(
                                            matchDB.slice(startIndex, endIndex)
                                        )
                                    );
                                } else {
                                    return new TextDecoder().decode(
                                        JSONGzip.pit.stringify(
                                            pitDB.slice(startIndex, endIndex)
                                        )
                                    );
                                }
                            })()}
                        />

                        <Pagination
                            mt={16}
                            total={Math.ceil(
                                (usingMatchDB ? matchDB : pitDB).length /
                                    entriesPerQRCode
                            )}
                        />
                    </Stack>
                ),
            }),
        [activePage]
    );

    useEffect(() => {
        if (activePage) openQRCodeModal();
    }, [activePage]);

    return (
        <>
            {matchDB.length != 0 ? (
                <Button
                    value="create-match-qr"
                    onClick={() => {
                        setUsingMatchDB(true);
                        setPage(1);
                    }}
                    variant="subtle"
                >
                    View Match QR Codes
                </Button>
            ) : (
                <Text size="lg" align="center">
                    No match data to export
                </Text>
            )}

            {pitDB.length != 0 ? (
                <Button
                    value="create-pit-qr"
                    onClick={() => {
                        setUsingMatchDB(false);
                        setPage(1);
                    }}
                    variant="subtle"
                >
                    View Pit QR Codes
                </Button>
            ) : (
                <Text size="lg" align="center">
                    No pit data to export
                </Text>
            )}
        </>
    );
};
