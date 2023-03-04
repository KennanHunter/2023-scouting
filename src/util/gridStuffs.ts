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

const gridUtilities = ({ gridColumns: grid }: GridData) => {
    const coneColumnsTotals: GridColumnSimple = grid.reduce(
        (prev, cur, index) => {
            const isConeColumn = index % 3 !== 1;

            if (!isConeColumn) {
                return;
            }

            // return prev + cur.hybridCone + cur.level1 + cur.level2;
        },
        {} as GridColumnSimple
    );
};
