import { Box, Button, Center, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { FC, useCallback, useEffect, useState } from "react";
import { useMatchDB } from "../../stores/match/matchDB";
import { usePitDB } from "../../stores/pit/pitDB";

export const CreateQR: FC = () => {
    const pitLength = usePitDB((state) => state.db.length);
    const matchLength = useMatchDB((state) => state.db.length);
    const entryLength = pitLength + matchLength;

    const [activePage, setPage] = useState<number | undefined>();

    const openQRCodeModal = useCallback(
        () =>
            openModal({
                title: "Scan QR Codes",
                centered: true,
                children: (
                    <>
                        <Title>Page {activePage}</Title>
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
                    Exporting {entryLength} matches, in
                    {Math.ceil(entryLength / 10)} QR Codes
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
