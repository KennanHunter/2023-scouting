import { Box, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC } from "react";

// @ts-ignore don't ask
import QrReader from "react-web-qr-reader"; // note: the types for this library are entirely wrong for some reason, ignore the "any" type
import { JSONGzip } from "../../data/formats/JSONGzip";
import { useMatchDB } from "../../stores/match/matchDB";
import { MatchState } from "../../stores/match/matchTypes";
import { usePitDB } from "../../stores/pit/pitDB";
import { PitState } from "../../stores/pit/pitTypes";

export const ScanQR: FC = () => {
    const pushToMatchDB = useMatchDB((state) => state.push);
    const pushToPitDB = usePitDB((state) => state.push);

    const delay = 500;

    const handleScan = (qrScannerResult: any) => {
        if (qrScannerResult) {
            const parsedMatchesFromQR = JSONGzip.match.parse(qrScannerResult.binaryData as Uint8Array);
            const parsedPitsFromQR = JSONGzip.pit.parse(qrScannerResult.binaryData as Uint8Array);

            if (!parsedMatchesFromQR && !parsedPitsFromQR) {
                showNotification({
                    title: "Scan Failed!",
                    message: `QR Code Data was not a Match or Pit Entry`,
                    color: "red",
                });
            }

            if (parsedMatchesFromQR) {
                const filteredParsedMatches: MatchState[] = parsedMatchesFromQR.filter((parsedMatch) =>
                    useMatchDB.getState().db.filter((matchDBMatch) => matchDBMatch.time == parsedMatch.time).length == 0
                );

                filteredParsedMatches.forEach((match) => pushToMatchDB(match));

                if (filteredParsedMatches.length == 0) {
                    showNotification({
                        title: "Scan Complete!",
                        message: `No New Match Entries Found`,
                        color: "yellow",
                    });
                } else {
                    showNotification({
                        title: "Scan Complete!",
                        message: `Imported ${filteredParsedMatches.length} Match Entries`,
                        color: "green",
                    });
                }
            }

            if (parsedPitsFromQR) {
                const filteredParsedPits: PitState[] = parsedPitsFromQR.filter((parsedPit) =>
                    usePitDB.getState().db.filter((pitDBMatch) => pitDBMatch.time == parsedPit.time).length == 0
                );

                filteredParsedPits.forEach((pit) => pushToPitDB(pit));

                if (filteredParsedPits.length == 0) {
                    showNotification({
                        title: "Scan Complete!",
                        message: `No New Pit Entries Found`,
                        color: "yellow",
                    });
                } else {
                    showNotification({
                        title: "Scan Complete!",
                        message: `Imported ${filteredParsedPits.length} Pit Entries`,
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
        <Box>
            <Title align="center" mb={16}>
                QR Code Scanner
            </Title>
            <QrReader delay={delay} onError={handleError} onScan={handleScan} />
        </Box>
    );
};
