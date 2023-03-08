import { Box, Button, Center, Divider, Pagination, Stack, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { FC, useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { JSONGzip } from "../../data/formats/JSONGzip";
import { useMatchDB } from "../../stores/match/matchDB";
import { usePitDB } from "../../stores/pit/pitDB";
import { PitState } from "../../stores/pit/pitTypes";
import { Link } from "react-router-dom";

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
                children: (
                    <Stack align="center">
                        <Title mb={16}>Page {activePage}</Title>

                        <QRCode
                            style={{
                                borderWidth: 16,
                                borderStyle: "solid",
                                borderColor: "white"
                            }}
                            level="H"
                            value={(() => {
                                if (!activePage)
                                    throw new Error(
                                        "Active page not initialized in qr code call"
                                    );

                                const startIndex = (activePage - 1) * entriesPerQRCode;
                                const endIndex = startIndex + entriesPerQRCode;

                                //return new TextDecoder().decode(new Uint8Array([...Array(255).keys()]));
                                if (usingMatchDB) {
                                    return new TextDecoder().decode(JSONGzip.match.stringify(matchDB.slice(startIndex, endIndex)));
                                } else {
                                    return new TextDecoder().decode(JSONGzip.pit.stringify(pitDB.slice(startIndex, endIndex)));
                                }
                            })()}
                        />

                        <Pagination mt={16} total={Math.ceil((usingMatchDB ? matchDB : pitDB).length / entriesPerQRCode)} />
                    </Stack>
                ),
            }),
        [activePage]
    );

    useEffect(() => {
        if (activePage) openQRCodeModal();
    }, [activePage]);

    return (
        <Stack>
            <Link to={"/database/viewdata"} style={{ all: "unset", flexGrow: 1 }}>
                <Button fullWidth my={4}>
                    Back to Data View
                </Button>
            </Link>
            <Title align="center" mb={16}>
                QR Code Creator
            </Title>

            <Divider my="sm" />

            {(matchDB.length != 0) ?  (
                <Button
                    onClick={() => {
                        setUsingMatchDB(true);
                        setPage(1);
                    }}
                >
                    Export Matches
                </Button>
            ) : (
                <Text size="lg" align="center">No match data to export</Text>
            ) }

            <Divider my="sm" />

            {(pitDB.length != 0) ?  (
                <Button
                    onClick={() => {
                        setUsingMatchDB(false);
                        setPage(1);
                    }}
                >
                    Export Pits
                </Button>
            ) : (
                <Text size="lg" align="center">No pit data to export</Text>
            ) }
        </Stack>
    );
};
