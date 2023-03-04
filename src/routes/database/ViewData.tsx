import { Button, Divider, Flex, ScrollArea, Stack, Table, Text } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CSV } from "../../data/formats/CSV";
import { useMatchDB } from "../../stores/match/matchDB";
import { usePitDB } from "../../stores/pit/pitDB";

export const ViewData: FC = () => {
    const matchDB = useMatchDB((state) => state.db);
    const clearMatchDB = useMatchDB((state) => state.clear);

    const pitDB = usePitDB((state) => state.db);
    const clearPitDB = usePitDB((state) => state.clear);

    const downloadMatchFile = () => {
        const fileBlob = CSV.toBlob(matchDB);

        // im so god damn tired https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
        const element = document.createElement("a");

        element.href = URL.createObjectURL(fileBlob);
        element.download = `data.${fileBlob.type.split("/")[1]}`;

        document.body.appendChild(element); // Required for this to work in FireFox

        element.click();

        element.remove();
    };

    const downloadPitFile = () => {
        const fileBlob = CSV.toBlob(matchDB); // TODO: REPLACE WITH PIT CSV

        // im so god damn tired https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
        const element = document.createElement("a");

        element.href = URL.createObjectURL(fileBlob);
        element.download = `data.${fileBlob.type.split("/")[1]}`;

        document.body.appendChild(element); // Required for this to work in FireFox

        element.click();

        element.remove();
    };

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

            <Divider my="sm" />

            {(matchDB.length) ? (
                <>
                    <Flex gap={"sm"} w={"100%"}>
                        <Button m={4} onClick={clearMatchDB} style={{ flexGrow: 1 }}>
                            Clear
                        </Button>
                        <Button m={4} onClick={downloadMatchFile} style={{ flexGrow: 1 }}>
                            Download
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
                                        {Object.values(match).map((value, index) => (
                                            <td key={index}>{JSON.stringify(value)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ScrollArea>
                </>) : (
                    <Text size="lg">No match data to display</Text>
            )}

            <Divider my="sm" />

            {(pitDB.length) ? (
                <>
                    <Flex gap={"sm"} w={"100%"}>
                        <Button m={4} onClick={clearPitDB} style={{ flexGrow: 1 }}>
                            Clear
                        </Button>
                        <Button m={4} onClick={downloadPitFile} style={{ flexGrow: 1 }}>
                            Download
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
                                        {Object.values(pit).map((value, index) => (
                                            <td key={index}>{JSON.stringify(value)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ScrollArea>
                </>) : (
                    <Text size="lg">No pit data to display</Text>
            )}
        </Stack>
    );
};
