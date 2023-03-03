import { ActionIcon, Box, Button, Grid } from "@mantine/core";
import {
    IconArrowsRightLeft,
    IconSquare,
    IconTrafficCone,
} from "@tabler/icons-react";
import { FC } from "react";

export type GridColumn = {
    level2: number;
    level1: number;
    hybrid: number;
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
    data?: GridData;
};

export const GridInput: FC<GridInputParams> = ({ data, onChange }) => {
    const initData = (): GridData => {
        return {
            gridColumns: [
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
                { level2: 0, level1: 0, hybrid: 0 },
            ],
            history: [],
        };
    };

    let trueData = data ? data : initData();

    const changeItem = (column: number, level: number, by: number) => {
        switch (level) {
            case 0:
                trueData.gridColumns[column].hybrid += by;
                break;
            case 1:
                trueData.gridColumns[column].level1 += by;
                break;
            case 2:
                trueData.gridColumns[column].level2 += by;
                break;
        }
    };

    const addItem = (column: number, level: number) => {
        changeItem(column, level, 1);

        trueData.history.push({
            column: column,
            level: level,
        });

        onChange(JSON.parse(JSON.stringify(trueData)));
    };

    const undo = () => {
        if (trueData.history.length == 0) return;

        changeItem(
            trueData.history[trueData.history.length - 1].column,
            trueData.history[trueData.history.length - 1].level,
            -1
        );

        trueData.history = trueData.history.slice(
            0,
            trueData.history.length - 1
        );

        onChange(JSON.parse(JSON.stringify(trueData)));
    };

    return (
        <Box my={8}>
            <Grid justify="center" gutter={4} grow my={8}>
                {trueData.gridColumns.map(
                    (column: GridColumn, index: number) => (
                        <Grid.Col span="auto" key={`gridcolumn#${index}`}>
                            <ActionIcon
                                variant="filled"
                                size="md"
                                color={
                                    Math.floor(index / 3) % 2 == 0
                                        ? "blue"
                                        : "gray"
                                }
                                sx={{
                                    width: "100%",
                                }}
                                my={4}
                                onClick={() => addItem(index, 2)}
                            >
                                {data?.gridColumns[index].level2}
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
                                    Math.floor(index / 3) % 2 == 0
                                        ? "blue"
                                        : "gray"
                                }
                                sx={{
                                    width: "100%",
                                }}
                                my={4}
                                onClick={() => addItem(index, 1)}
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
                                }}
                                my={4}
                                onClick={() => addItem(index, 0)}
                            >
                                {data?.gridColumns[index].hybrid}
                                <IconArrowsRightLeft size={14} />
                            </ActionIcon>
                        </Grid.Col>
                    )
                )}
            </Grid>
            <Button variant="filled" size="sm" compact fullWidth onClick={undo}>
                Undo
            </Button>
        </Box>
    );
};
