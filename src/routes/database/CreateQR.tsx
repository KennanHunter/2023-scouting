import { Box, Button, Center, Text } from "@mantine/core";
import { FC, useState } from "react";
import { useMatchDB } from "../../stores/match/matchDB";
import { usePitDB } from "../../stores/pit/pitDB";

export const CreateQR: FC = () => {
    const pitDB = usePitDB((state) => state.db);
    const matchDB = useMatchDB((state) => state.db);

    const pitNumOfQRCode = Math.ceil(pitDB.length / 10);
    const matchNumOfQRCode = Math.ceil(matchDB.length / 10);

    const totalNumOfQRCode = pitNumOfQRCode + matchNumOfQRCode;
    const [activePage, setPage] = useState<number | undefined>();

    const activeSlice = (() => {
        if (!activePage) return;

        if (activePage > pitNumOfQRCode) {
            // do match db stuff
        }
        else {
            // do pit db stuff
        }
    })();

    return (
        <Box>
            <Center>
                <Text>
                    Exporting {pitDB.length + matchDB.length} matches, in
                    {totalNumOfQRCode} QR Codes
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
