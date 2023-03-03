import { MatchState } from "../../stores/match/matchTypes";

const escapeString = (value: string): string => value.replace('"', '\\"');

export const CSV = {
    toString: (db: MatchState[]): string => {
        // a hacky csv generator to conform to Mady's data structure
        const table = Object.values(db).map((row) =>
            Object.entries(row)
                .map(([key, val]): string => {
                    if (typeof val === "boolean") return JSON.stringify(val);
                    if (typeof val === "string") return val;
                    if (typeof val === "number") return JSON.stringify(val);
                    if (typeof val === "object") {
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
    toMadyString: (db: MatchState[]): string =>
        db.map((row) => [row.scouter].join(",")).join("\n"),
};
