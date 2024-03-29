import { Box, Grid } from "@mantine/core";
import { FC } from "react";
import { GridData } from "./GridInput";
import { StepperInput } from "./StepperInput";

type SimpleGridInputParams = {
    onChange: (data: GridData) => void;
    data: GridData;
    readonly?: boolean;
    error: string | undefined;
};

export const SimpleGridInput: FC<SimpleGridInputParams> = ({
    data,
    readonly,
    onChange,
    error,
}) => {
    const setRowCol = (value: number, row: number, col: number) => {
        if (readonly) return;

        switch (row) {
            case 3:
                data.gridColumns[col].level2 = value;
                break;
            case 2:
                data.gridColumns[col].level1 = value;
                break;
            case 1:
                data.gridColumns[col].hybridCone = value;
                break;
            case 0:
                data.gridColumns[col].hybridCube = value;
                break;
        }

        onChange(data);
    };

    return (
        <Box my={8} miw={300}>
            <Grid justify="center" gutter={4} grow my={8}>
                <Grid.Col span={2}>
                    <StepperInput
                        value={data.gridColumns[0].level2}
                        onChange={(value) => setRowCol(value ?? 0, 3, 0)}
                        placeholder="Top Cones"
                        label="Top Cones"
                        size="lg"
                        error={error}
                        m={4}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <StepperInput
                        value={data.gridColumns[1].level2}
                        onChange={(value) => setRowCol(value ?? 0, 3, 1)}
                        placeholder="Top Cubes"
                        label="Top Cubes"
                        size="lg"
                        error={error}
                        m={4}
                    />
                </Grid.Col>
            </Grid>

            <Grid justify="center" gutter={4} grow my={8}>
                <Grid.Col span={2}>
                    <StepperInput
                        value={data.gridColumns[0].level1}
                        onChange={(value) => setRowCol(value ?? 0, 2, 0)}
                        placeholder="Middle Cones"
                        label="Middle Cones"
                        size="lg"
                        error={error}
                        m={4}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <StepperInput
                        value={data.gridColumns[1].level1}
                        onChange={(value) => setRowCol(value ?? 0, 2, 1)}
                        placeholder="Middle Cubes"
                        label="Middle Cubes"
                        size="lg"
                        error={error}
                        m={4}
                    />
                </Grid.Col>
            </Grid>

            <Grid justify="center" gutter={4} grow my={8}>
                <Grid.Col span={2}>
                    <StepperInput
                        value={data.gridColumns[0].hybridCone}
                        onChange={(value) => setRowCol(value ?? 0, 1, 0)}
                        placeholder="Bottom Cones"
                        label="Bottom Cones"
                        size="lg"
                        error={error}
                        m={4}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <StepperInput
                        value={data.gridColumns[0].hybridCube}
                        onChange={(value) => setRowCol(value ?? 0, 0, 0)}
                        placeholder="Bottom Cubes"
                        label="Bottom Cubes"
                        size="lg"
                        error={error}
                        m={4}
                    />
                </Grid.Col>
            </Grid>
        </Box>
    );
};
