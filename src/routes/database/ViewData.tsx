import {
    Button,
    Divider,
    FileInput,
    Flex,
    ScrollArea,
    Select,
    Stack,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useMatchDB } from "../../stores/match/matchDB";
import { usePitDB } from "../../stores/pit/pitDB";
import { Exporter, exporters } from "../../data/formats/types";
import { PitState } from "../../stores/pit/pitTypes";
import { MatchState } from "../../stores/match/matchTypes";
import { showNotification } from "@mantine/notifications";
import { FieldData, FieldInput, FieldPoint } from "../../components/FieldInput";
import { GridData, GridInput } from "../../components/GridInput";

export const ViewData: FC = () => {
    const matchDB = useMatchDB((state) => state.db);
    const clearMatchDB = useMatchDB((state) => state.clear);
    const insertNewMatchDB = useMatchDB((state) => state.insertNew);

    const pitDB = usePitDB((state) => state.db);
    const clearPitDB = usePitDB((state) => state.clear);
    const insertNewPitDB = usePitDB((state) => state.insertNew);

    const [selectedFormat, setSelectedFormat] = useState<string>("CSV");

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

        const reader = new FileReader()

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
        }

        reader.onerror = (e: ProgressEvent<FileReader>) => {
            showNotification({
                title: "Upload Error!",
                message: `Failed to upload "${selectedFile.name}"`,
                color: "red",
            });
        }

        if (exporters[selectedFormat].exportType == "string")
            reader.readAsText(selectedFile)
        else 
            reader.readAsArrayBuffer(selectedFile);
        
        return new Blob([]);
    };

    const downloadMatchFile = (exporter: Exporter<string | Uint8Array>) =>
        downloadBlob(exporter.match.blobify(matchDB));

    const uploadMatchFile = (exporter: Exporter<string | Uint8Array>) => 
        uploadBlob((data) => {
            console.log(`The content of ${selectedFile?.name} is ${data}, arraybuffer ${(data instanceof ArrayBuffer)}`);

            const matchData: MatchState[] | undefined = (data instanceof ArrayBuffer) ? exporter.match.parse(new Uint8Array(data)) : exporter.match.parse(data);
            
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
        })
    

    const downloadPitFile = (exporter: Exporter<string | Uint8Array>) =>
        downloadBlob(exporter.pit.blobify(pitDB));

    const uploadPitFile = (exporter: Exporter<string | Uint8Array>) => 
        uploadBlob((data) => {
            const pitData: PitState[] | undefined = (data instanceof ArrayBuffer) ? exporter.pit.parse(new Uint8Array(data)) : exporter.pit.parse(data);
            
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
        })

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
            <Link
                to={"/database/create/qr"}
                style={{ all: "unset", flexGrow: 1 }}
            >
                <Button fullWidth my={4}>
                    View QR Codes
                </Button>
            </Link>
            <Link
                to={"/database/scan/qr"}
                style={{ all: "unset", flexGrow: 1 }}
            >
                <Button fullWidth my={4}>
                    Scan QR Codes
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

            <Divider my="sm" />

            <Title align="center">Match Data</Title>

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
                                downloadMatchFile(exporters[selectedFormat])
                            }
                            style={{ flexGrow: 1 }}
                        >
                            Download
                        </Button>
                        <Button
                            m={4}
                            onClick={() =>
                                uploadMatchFile(exporters[selectedFormat])
                            }
                            style={{ flexGrow: 1 }}
                        >
                            Upload
                        </Button>
                    </Flex>
                    <ScrollArea>
                        <Table striped withBorder withColumnBorders my={4}>
                            <thead>
                                <tr>
                                    {Object.keys(matchDB[0]).map((matchKey) => (
                                        <th key={matchKey}>{matchKey}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {matchDB.map((match, index) => (
                                    <tr key={`match#${index}`}>
                                        {Object.values(match).map(
                                            (value, index) => {
                                                if (FieldPoint().safeParse(value).success) {
                                                    return (
                                                        <td key={index}>
                                                            <FieldInput onChange={() => {}} data={[ FieldPoint().parse(value) ]} readonly />
                                                        </td>
                                                    )
                                                }
                                                if (GridData().safeParse(value).success) {
                                                    return (
                                                        <td key={index}>
                                                            <GridInput onChange={() => {}} data={GridData().parse(value)} readonly />
                                                        </td>
                                                    )
                                                }

                                                return (
                                                    <td key={index}>
                                                        {JSON.stringify(value)}
                                                    </td>
                                                );
                                            }
                                        )}
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
                                uploadMatchFile(exporters[selectedFormat])
                            }
                            style={{ flexGrow: 1 }}
                        >
                            Upload
                        </Button>
                    </Flex>
                    <Text size="lg">No match data to display</Text>
                </>
            )}

            <Divider my="sm" />

            <Title align="center">Pit Data</Title>

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
                                downloadPitFile(exporters[selectedFormat])
                            }
                            style={{ flexGrow: 1 }}
                        >
                            Download
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
                        <Table striped withBorder withColumnBorders my={4}>
                            <thead>
                                <tr>
                                    {Object.keys(pitDB[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pitDB.map((pit, index) => (
                                    <tr key={`match#${index}`}>
                                        {Object.values(pit).map(
                                            (value, index) => (
                                                <td key={index}>
                                                    {JSON.stringify(value)}
                                                </td>
                                            )
                                        )}
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
        </Stack>
    );
};
