import { GridColumn, GridData } from "../components/GridInput";

const totalRows = (columns: GridColumn[]): GridColumn =>
    columns.reduce(
        (prev, cur) => {
            return {
                level2: prev.level2 + cur.level2,
                level1: prev.level1 + cur.level1,
                hybridCone: prev.hybridCone + cur.hybridCone,
                hybridCube: prev.hybridCube + cur.hybridCube,
            };
        },
        { level1: 0, level2: 0, hybridCone: 0, hybridCube: 0 } as GridColumn
    );

type GridColumnSimple = Pick<GridColumn, "level1" | "level2"> & {
    hybrid: number;
};

export const gridUtilities = ({ gridColumns: grid }: GridData) => {
    const coneColumnsTotals = grid.reduce<GridColumnSimple>(
        (prev, cur, index) => {
            const isConeColumn = index % 3 !== 1;

            if (!isConeColumn) {
                return {
                    level2: prev.level2,
                    level1: prev.level1,
                    hybrid: prev.hybrid + cur.hybridCone,
                };
            }

            return {
                level2: prev.level2 + cur.level2,
                level1: prev.level1 + cur.level1,
                hybrid: prev.hybrid + cur.hybridCone,
            };
        },
        { level1: 0, level2: 0, hybrid: 0 }
    );

    const cubeColumnsTotals: GridColumnSimple = grid.reduce(
        (prev, cur, index) => {
            const isCubeColumn = index % 3 === 1;

            if (!isCubeColumn) {
                return {
                    level2: prev.level2,
                    level1: prev.level1,
                    hybrid: prev.hybrid + cur.hybridCube,
                };
            }

            return {
                level2: prev.level2 + cur.level2,
                level1: prev.level1 + cur.level1,
                hybrid: prev.hybrid + cur.hybridCube,
            };
        },
        { level1: 0, level2: 0, hybrid: 0 } as GridColumnSimple
    );

    return {
        cubeColumnsTotals,
        coneColumnsTotals,
    };
};

const inflateSimpleGridColumn = (
    column: GridColumnSimple,
    item: "cube" | "cone"
) =>
    ({
        level1: column.level1,
        level2: column.level2,
        [item === "cone" ? "hybridCone" : "hybridCube"]: column.hybrid,
        [item !== "cone" ? "hybridCone" : "hybridCube"]: 0,
    } as GridColumn);

const populateGridData = (
    gridData: GridData,
    utilities: ReturnType<typeof gridUtilities>
): GridData => ({
    gridColumns: [
        inflateSimpleGridColumn(utilities.coneColumnsTotals, "cone"),
        inflateSimpleGridColumn(utilities.cubeColumnsTotals, "cube"),
        ...gridData.gridColumns.slice(2),
    ] as any,
    history: gridData.history,
});
