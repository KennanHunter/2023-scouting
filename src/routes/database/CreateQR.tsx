import { Box, Button, Center, Pagination, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { FC, useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { JSONGzip } from "../../data/formats/JSONGzip";
import { useMatchDB } from "../../stores/match/matchDB";
import { MatchState } from "../../stores/match/matchTypes";
import { usePitDB } from "../../stores/pit/pitDB";
import { PitState } from "../../stores/pit/pitTypes";

export const CreateQR: FC = () => {
    const pitDB = usePitDB((state) => state.db);
    const matchDB = useMatchDB((state) => state.db);
    const [fullDB, setFullDB] = useState<(MatchState | PitState)[]>([]);

    useEffect(() => {
        setFullDB([...pitDB, ...matchDB]);
    }, [pitDB, matchDB]);

    const [activePage, setPage] = useState<number | undefined>();

    const openQRCodeModal = useCallback(
        () =>
            openModal({
                title: "Scan QR Codes",
                centered: true,
                children: (
                    <>
                        <Title>Page {activePage}</Title>
                        <QRCode
                            value={(() => {
                                if (!activePage)
                                    throw new Error(
                                        "Active page not initialized in qr code call"
                                    );

                                const activeSlice = pitDB.slice(
                                    activePage * 10,
                                    activePage * 10 + 10
                                );

                                activeSlice.map((val) => {
                                    const { success: isMatch } =
                                        MatchState().safeParse(val);

                                    if (isMatch) {
                                        MatchState().parse(val);

                                        return JSONGzip.match.stringify(val);
                                    }

                                    if (isMatch) {
                                        PitState().parse(val);

                                        return JSONGzip.pit.stringify(val);
                                    }
                                });
                            })()}
                        />
                        <Pagination total={fullDB.length} />
                    </>
                ),
            }),
        [activePage]
    );

    useEffect(() => {
        if (activePage) openQRCodeModal();
    }, [activePage]);

    return (
        <Box>
            <Center>
                <Text>
                    Exporting {fullDB} matches, in
                    {Math.ceil(fullDB.length / 10)} QR Codes
                </Text>
                <Button
                    onClick={() => {
                        setPage(1);
                    }}
                >
                    Start total data export
                </Button>
            </Center>
        </Box>
    );
};
