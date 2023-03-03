import { Button, Stack, Table, Text } from "@mantine/core";
import { FC } from "react";
import { useMatchDB } from "../../stores/matchDB";
import { Link } from "react-router-dom";
import { CSVGenerator } from "../../data/generator/CSVGenerator";

export const ViewData: FC = () => {
    const matchDB = useMatchDB(
        (state) => state.db
    )
    const clearMatchDB = useMatchDB(
        (state) => state.clear
    )

    if (matchDB.length < 1) {
        return <Stack>
            <Text size="lg">No match data to display</Text>
        </Stack>
    }

    const downloadFile = () => {
        const fileBlob = CSVGenerator(matchDB);

        // im so god damn tired https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
        const element = document.createElement("a");
        
        element.href = URL.createObjectURL(fileBlob);
        element.download = `data.${fileBlob.type.split('/')[1]}`;

        document.body.appendChild(element); // Required for this to work in FireFox

        element.click();

        element.remove();
    }

    return <Stack sx={{
        overflowX: "scroll",
        maxWidth: "90vw"
    }}>

        <Link to={"/"} style={{ all: "unset" }}>
            <Button
                fullWidth
                my={4}
            >
                Home
            </Button>
        </Link>
        <Button
            fullWidth
            my={4}
            onClick={clearMatchDB}
        >
            Clear
        </Button>
        <Button
            fullWidth
            my={4}
            onClick={downloadFile}
        >
            Download
        </Button>
        <Table striped withBorder withColumnBorders my={4}>
            <thead>
                <tr>
                    {
                        Object.keys(matchDB[0]).map((matchKey) => (
                            <th key={matchKey}>
                                { matchKey }
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    matchDB.map((match, index) => (
                        <tr key={`match#${index}`}>
                            {
                                Object.keys(match).map((matchKey) => (
                                    <td key={matchKey}>
                                        { "hello" }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </Stack>
};
