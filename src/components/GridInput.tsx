import { ActionIcon, Box, Button, Grid, Text } from "@mantine/core";
import { IconSquare, IconTrafficCone } from "@tabler/icons-react";
import { FC } from "react";

export type GridColumn = {
    level2: number;
    level1: number;
    hybridCone: number;
    hybridCube: number;
};

export type GridHistoryEntry = {
    column: number;
    level: number;
};

export type GridData = {
    gridColumns: [
        GridColumn,
        GridColumn,
        GridColumn,
        GridColumn,
        GridColumn,
        GridColumn,
        GridColumn,
        GridColumn,
        GridColumn
    ];
    history: GridHistoryEntry[];
};

type GridInputParams = {
    onChange: (data: GridData) => void;
    data: GridData;
};

export const initGridData = (): GridData => {
    return {
        gridColumns: [
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
            { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
        ],
        history: [],
    };
};

export const GridInput: FC<GridInputParams> = ({ data, onChange }) => {
    const changeItem = (column: number, level: number, by: number) => {
        switch (level) {
            case 0:
                data.gridColumns[column].hybridCube += by;
                break;
            case 1:
                data.gridColumns[column].hybridCone += by;
                break;
            case 2:
                data.gridColumns[column].level1 += by;
                break;
            case 3:
                data.gridColumns[column].level2 += by;
                break;
        }
    };

    const addItem = (column: number, level: number) => {
        changeItem(column, level, 1);

        data.history.push({
            column: column,
            level: level,
        });

        onChange(JSON.parse(JSON.stringify(data)));
    };

    const undo = () => {
        if (data.history.length == 0) return;

        changeItem(
            data.history[data.history.length - 1].column,
            data.history[data.history.length - 1].level,
            -1
        );

        data.history = data.history.slice(0, data.history.length - 1);

        onChange(JSON.parse(JSON.stringify(data)));
    };

    return (
        <Box my={8}>
            <Grid justify="center" gutter={4} grow my={8}>
                {data.gridColumns.map((column: GridColumn, index: number) => (
                    <Grid.Col span="auto" key={`gridcolumn#${index}`}>
                        <ActionIcon
                            variant="filled"
                            size="md"
                            color={
                                Math.floor(index / 3) % 2 == 0 ? "blue" : "gray"
                            }
                            sx={{
                                width: "100%",
                            }}
                            my={4}
                            onClick={() => addItem(index, 3)}
                        >
                            <Text>{data?.gridColumns[index].level2}</Text>
                            {(index - 1) % 3 == 0 ? (
                                <IconSquare size={14} />
                            ) : (
                                <IconTrafficCone size={14} />
                            )}
                        </ActionIcon>
                        <ActionIcon
                            variant="filled"
                            size="md"
                            color={
                                Math.floor(index / 3) % 2 == 0 ? "blue" : "gray"
                            }
                            sx={{
                                width: "100%",
                            }}
                            my={4}
                            onClick={() => addItem(index, 2)}
                        >
                            {data?.gridColumns[index].level1}
                            {(index - 1) % 3 == 0 ? (
                                <IconSquare size={14} />
                            ) : (
                                <IconTrafficCone size={14} />
                            )}
                        </ActionIcon>
                        <ActionIcon
                            variant="filled"
                            size="md"
                            color={index % 2 == 0 ? "violet" : "orange"}
                            sx={{
                                width: "100%",
                                borderBottomLeftRadius: "0",
                                borderBottomRightRadius: "0",
                            }}
                            mt={4}
                            onClick={() => addItem(index, 1)}
                        >
                            {data?.gridColumns[index].hybridCone}
                            <IconTrafficCone size={14} />
                        </ActionIcon>
                        <ActionIcon
                            variant="filled"
                            size="md"
                            color={index % 2 == 0 ? "violet" : "orange"}
                            sx={{
                                width: "100%",
                                borderTopLeftRadius: "0",
                                borderTopRightRadius: "0",
                            }}
                            mb={4}
                            onClick={() => addItem(index, 0)}
                        >
                            {data?.gridColumns[index].hybridCube}
                            <IconSquare size={14} />
                        </ActionIcon>
                    </Grid.Col>
                ))}
            </Grid>
            <Button variant="filled" size="sm" compact fullWidth onClick={undo}>
                Undo
            </Button>
        </Box>
    );
};
