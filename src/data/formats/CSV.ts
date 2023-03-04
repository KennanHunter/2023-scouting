import { MatchState } from "../../stores/match/matchTypes";
import { escapeString } from "./utilities";

export const CSV = {
    stringify: (db: MatchState[]): string => {
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
    blobify: (db: MatchState[]): Blob =>
        new Blob([CSV.stringify(db)], { type: "text/csv" }),
};
