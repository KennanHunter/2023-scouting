import {
    Button,
    FileInput,
    Flex,
    ScrollArea,
    Select,
    Stack,
    Table,
    Tabs,
    Text,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Exporter, exporters } from "../../data/formats/types";
import { useMatchDB } from "../../stores/match/matchDB";
import { MatchState } from "../../stores/match/matchTypes";
import { usePitDB } from "../../stores/pit/pitDB";
import { PitState } from "../../stores/pit/pitTypes";
import { MatchDataView } from "./MatchDataView";
import { PitDataView } from "./PitDataView";
import { CreateQR } from "./qr/CreateQR";
import { ScanQR } from "./qr/ScanQR";

export const ViewData: FC = () => {
    const matchDB = useMatchDB((state) => state.db);
    const clearMatchDB = useMatchDB((state) => state.clear);
    const insertNewMatchDB = useMatchDB((state) => state.insertNew);

    const pitDB = usePitDB((state) => state.db);
    const clearPitDB = usePitDB((state) => state.clear);
    const insertNewPitDB = usePitDB((state) => state.insertNew);

    const [selectedFormat, setSelectedFormat] = useState<string>("Mady CSV");

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const downloadBlob = (fileBlob: Blob) => {
        const element = document.createElement("a");

        element.href = URL.createObjectURL(fileBlob);
        element.download = `data.${fileBlob.type.split("/")[1]}`;

        document.body.appendChild(element); // Required for this to work in FireFox

        element.click();

        element.remove();
    };

    const uploadBlob = (callback: (data: string | ArrayBuffer) => void) => {
        if (!selectedFile) {
            showNotification({
                title: "Upload Error!",
                message: `Please select a file to upload`,
                color: "red",
            });

            return;
        }

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
                callback(e.target.result);
            } else {
                showNotification({
                    title: "Upload Error!",
                    message: `Failed to upload "${selectedFile.name}"`,
                    color: "red",
                });
            }
        };

        reader.onerror = (e: ProgressEvent<FileReader>) => {
            showNotification({
                title: "Upload Error!",
                message: `Failed to upload "${selectedFile.name}"`,
                color: "red",
            });
        };

        if (exporters[selectedFormat].exportType == "string")
            reader.readAsText(selectedFile);
        else reader.readAsArrayBuffer(selectedFile);

        return new Blob([]);
    };

    const downloadMatchFile = (exporter: Exporter<string | Uint8Array>) =>
        downloadBlob(exporter.match.blobify(matchDB));

    const uploadMatchFile = (exporter: Exporter<string | Uint8Array>) =>
        uploadBlob((data) => {
            console.log(
                `The content of ${selectedFile?.name} is ${data}, arraybuffer ${
                    data instanceof ArrayBuffer
                }`
            );

            const matchData: MatchState[] | undefined =
                data instanceof ArrayBuffer
                    ? exporter.match.parse(new Uint8Array(data))
                    : exporter.match.parse(data);

            if (!matchData) {
                showNotification({
                    title: "Upload Error!",
                    message: `Failed to parse "${selectedFile?.name}" as a ${selectedFormat}`,
                    color: "red",
                });
                return;
            }

            insertNewMatchDB(matchData);

            showNotification({
                title: "Upload Successful!",
                message: `Successfully uploaded "${selectedFile?.name}"`,
                color: "green",
            });
        });

    const downloadPitFile = (exporter: Exporter<string | Uint8Array>) =>
        downloadBlob(exporter.pit.blobify(pitDB));

    const uploadPitFile = (exporter: Exporter<string | Uint8Array>) =>
        uploadBlob((data) => {
            const pitData: PitState[] | undefined =
                data instanceof ArrayBuffer
                    ? exporter.pit.parse(new Uint8Array(data))
                    : exporter.pit.parse(data);

            if (!pitData) {
                showNotification({
                    title: "Upload Error!",
                    message: `Failed to parse "${selectedFile?.name}" as a ${selectedFormat}`,
                    color: "red",
                });
                return;
            }

            insertNewPitDB(pitData);

            showNotification({
                title: "Upload Successful!",
                message: `Successfully uploaded "${selectedFile?.name}"`,
                color: "green",
            });
        });

    const openQRGenerator = () =>
        openModal({
            title: `Create QR Codes`,
            centered: true,
            children: <CreateQR />,
        });

    const openQRScanner = () =>
        openModal({
            title: `Scan QR Codes`,
            centered: true,
            children: <ScanQR />,
        });

    const viewMatch = (data: MatchState) =>
        openModal({
            title: `Team ${data.teamNumber} ${data.matchLevel} ${data.matchNumber}`,
            centered: true,
            children: (
                <Tabs defaultValue="auto">
                    <Tabs.List>
                        <Tabs.Tab value="auto">Auto</Tabs.Tab>
                        <Tabs.Tab value="teleop">Teleop</Tabs.Tab>
                        <Tabs.Tab value="endgame">Endgame</Tabs.Tab>
                    </Tabs.List>
                    <MatchDataView match={data} />
                </Tabs>
            ),
        });
    const viewPit = (data: PitState) =>
        openModal({
            title: `Team ${data.teamNumber}'s Pit Scouting`,
            centered: true,
            children: (
                <Tabs defaultValue="robot">
                    <Tabs.List>
                        <Tabs.Tab value="robot">Robot</Tabs.Tab>
                        <Tabs.Tab value="auto">Auto</Tabs.Tab>
                        <Tabs.Tab value="teleop">Teleop</Tabs.Tab>
                    </Tabs.List>
                    <PitDataView pit={data} />
                </Tabs>
            ),
        });

    return (
        <Stack
            sx={{
                overflowX: "scroll",
                maxWidth: "90vw",
            }}
        >
            <Link to={"/"} style={{ all: "unset", flexGrow: 1 }}>
                <Button fullWidth my={4}>
                    Home
                </Button>
            </Link>
            <Select
                label={"Format"}
                searchable
                data={Object.keys(exporters)}
                value={selectedFormat}
                onChange={(value) => setSelectedFormat(value ?? "CSV")}
                m={4}
            />
            <FileInput
                m={4}
                placeholder="Select a File"
                label="Upload File"
                onChange={(payload) => setSelectedFile(payload)}
                accept={exporters[selectedFormat].mimeType}
            />

            <Tabs defaultValue="match-data">
                <Tabs.List>
                    <Tabs.Tab value="match-data">Match Data</Tabs.Tab>
                    <Tabs.Tab value="pit-data">Pit Data</Tabs.Tab>
                    <CreateQR />
                    <ScanQR />
                </Tabs.List>

                <Tabs.Panel value="match-data" pt="xs">
                    {matchDB.length ? (
                        <>
                            <Flex gap={"sm"} w={"100%"}>
                                <Button
                                    m={4}
                                    onClick={clearMatchDB}
                                    style={{ flexGrow: 1 }}
                                >
                                    Clear
                                </Button>
                                <Button
                                    m={4}
                                    onClick={() =>
                                        downloadMatchFile(
                                            exporters[selectedFormat]
                                        )
                                    }
                                    style={{ flexGrow: 1 }}
                                >
                                    Download as {selectedFormat}
                                </Button>
                                <Button
                                    m={4}
                                    onClick={() =>
                                        uploadMatchFile(
                                            exporters[selectedFormat]
                                        )
                                    }
                                    style={{ flexGrow: 1 }}
                                >
                                    Upload
                                </Button>
                            </Flex>
                            <ScrollArea>
                                <Table
                                    striped
                                    withBorder
                                    withColumnBorders
                                    my={4}
                                >
                                    <thead>
                                        <tr>
                                            <th>Team</th>
                                            <th>Match</th>
                                            <th>Scouter</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {matchDB.map((match, index) => (
                                            <tr key={`match#${index}`}>
                                                <td>{match.teamNumber}</td>
                                                <td>
                                                    {match.matchLevel}{" "}
                                                    {match.matchNumber}
                                                </td>
                                                <td>{match.scouter}</td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            viewMatch(match)
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </>
                    ) : (
                        <>
                            <Flex gap={"sm"} w={"100%"}>
                                <Button
                                    m={4}
                                    onClick={() =>
                                        uploadMatchFile(
                                            exporters[selectedFormat]
                                        )
                                    }
                                    style={{ flexGrow: 1 }}
                                >
                                    Upload
                                </Button>
                            </Flex>
                            <Text size="lg">No match data to display</Text>
                        </>
                    )}
                </Tabs.Panel>

                <Tabs.Panel value="pit-data" pt="xs">
                    {pitDB.length ? (
                        <>
                            <Flex gap={"sm"} w={"100%"}>
                                <Button
                                    m={4}
                                    onClick={clearPitDB}
                                    style={{ flexGrow: 1 }}
                                >
                                    Clear
                                </Button>
                                <Button
                                    m={4}
                                    onClick={() =>
                                        downloadPitFile(
                                            exporters[selectedFormat]
                                        )
                                    }
                                    style={{ flexGrow: 1 }}
                                >
                                    Download as {selectedFormat}
                                </Button>
                                <Button
                                    m={4}
                                    onClick={() =>
                                        uploadPitFile(exporters[selectedFormat])
                                    }
                                    style={{ flexGrow: 1 }}
                                >
                                    Upload
                                </Button>
                            </Flex>
                            <ScrollArea>
                                <Table
                                    striped
                                    withBorder
                                    withColumnBorders
                                    my={4}
                                >
                                    <thead>
                                        <tr>
                                            <th>Team</th>
                                            <th>Scouter</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pitDB.map((pit, index) => (
                                            <tr key={`pit#${index}`}>
                                                <td>{pit.teamNumber}</td>
                                                <td>{pit.scouter}</td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            viewPit(pit)
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </>
                    ) : (
                        <>
                            <Flex gap={"sm"} w={"100%"}>
                                <Button
                                    m={4}
                                    onClick={() =>
                                        uploadPitFile(exporters[selectedFormat])
                                    }
                                    style={{ flexGrow: 1 }}
                                >
                                    Upload
                                </Button>
                            </Flex>
                            <Text size="lg">No pit data to display</Text>
                        </>
                    )}
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
};
