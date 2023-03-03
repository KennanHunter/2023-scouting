import { Button, Flex, ScrollArea, Stack, Table, Text } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CSV } from "../../data/formats/CSV";
import { useMatchDB } from "../../stores/match/matchDB";

export const ViewData: FC = () => {
    const matchDB = useMatchDB((state) => state.db);
    const clearMatchDB = useMatchDB((state) => state.clear);

    if (!matchDB.length) {
        return (
            <Stack>
                <Text size="lg">No match data to display</Text>
            </Stack>
        );
    }

    const downloadFile = () => {
        const fileBlob = CSV.toBlob(matchDB);

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
            <Flex gap={"sm"} w={"100%"}>
                <Link to={"/"} style={{ all: "unset", flexGrow: 1 }}>
                    <Button fullWidth my={4}>
                        Home
                    </Button>
                </Link>
                <Button my={4} onClick={clearMatchDB} style={{ flexGrow: 1 }}>
                    Clear
                </Button>
                <Button my={4} onClick={downloadFile} style={{ flexGrow: 1 }}>
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
        </Stack>
    );
};
