import { MatchState } from "../../stores/matchTypes";

const escapeString = (value: string): string => value.replace('"', '\\"');

export const CSV = {
    toString: (db: MatchState[]): string => {
        // a hacky csv generator to conform to Mady's data structure
        const table = Object.values(db).map((row) =>
            Object.entries(row)
                .map(([key, value]): string => {
                    if (typeof value === "string") return value;
                    if (typeof value === "number") return JSON.stringify(value);
                    if (typeof value === "object") {
                    }

                    return "";
                })
                .map((value) => escapeString(value))
                .join(",")
        );

        return table.join("\n");
    },
    toBlob: (db: MatchState[]): Blob =>
        new Blob([CSV.toString(db)], { type: "text/csv" }),
};
