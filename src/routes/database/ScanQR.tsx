import { Box, Button, Center, Stack, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC, useState } from "react";

// @ts-ignore don't ask
import QrReader from "react-web-qr-reader"; // note: the types for this library are entirely wrong for some reason, ignore the "any" type
import { JSONGzip } from "../../data/formats/JSONGzip";
import { useMatchDB } from "../../stores/match/matchDB";
import { MatchState } from "../../stores/match/matchTypes";
import { usePitDB } from "../../stores/pit/pitDB";
import { PitState } from "../../stores/pit/pitTypes";
import { Link } from "react-router-dom";

import pako from "pako";

export const ScanQR: FC = () => {
    const insertNewMatchDB = useMatchDB((state) => state.insertNew);
    const insertNewPitDB = usePitDB((state) => state.insertNew);

    const delay = 500;

    const [ lastData, setLastData ] = useState(new Uint8Array(0));

    const handleScan = (qrScannerResult: any) => {
        if (qrScannerResult && (qrScannerResult.binaryData.length != lastData.length || lastData.filter((value, index) => qrScannerResult.binaryData[index] != value).length == 0)) {

            setLastData(qrScannerResult.binaryData);

            const parsedMatchesFromQR = JSONGzip.match.parse(new Uint8Array(qrScannerResult.binaryData));
            const parsedPitsFromQR = JSONGzip.pit.parse(new Uint8Array(qrScannerResult.binaryData));

            if (!parsedMatchesFromQR && !parsedPitsFromQR) {
                showNotification({
                    title: "Scan Failed!",
                    message: `QR Code Data was not a Match or Pit Entry`,
                    color: "red",
                });
            }

            if (parsedMatchesFromQR) {
                const numberItemsBefore = useMatchDB.getState().db.length;

                insertNewMatchDB(parsedMatchesFromQR);

                const numberItems = useMatchDB.getState().db.length - numberItemsBefore;

                if (numberItems == 0) {
                    showNotification({
                        title: "Scan Complete!",
                        message: `No New Match Entries Found`,
                        color: "yellow",
                    });
                } else {
                    showNotification({
                        title: "Scan Complete!",
                        message: `Imported ${numberItems} Match Entries`,
                        color: "green",
                    });
                }
            }

            if (parsedPitsFromQR) {
                const numberItemsBefore = usePitDB.getState().db.length;
                
                insertNewPitDB(parsedPitsFromQR);

                const numberItems = usePitDB.getState().db.length - numberItemsBefore;

                if (numberItems == 0) {
                    showNotification({
                        title: "Scan Complete!",
                        message: `No New Pit Entries Found`,
                        color: "yellow",
                    });
                } else {
                    showNotification({
                        title: "Scan Complete!",
                        message: `Imported ${numberItems} Pit Entries`,
                        color: "green",
                    });
                }
            }
        }
    };

    const handleError = (error: any) => {
        console.log(error);
    };

    return (
        <Stack>
            <Link to={"/database/viewdata"} style={{ all: "unset", flexGrow: 1 }}>
                <Button fullWidth my={4}>
                    Back to Data View
                </Button>
            </Link>
            <Title align="center" mb={16}>
                QR Code Scanner
            </Title>
            <QrReader delay={delay} onError={handleError} onScan={handleScan}/>
        </Stack>
    );
};
