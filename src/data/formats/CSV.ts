import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { escapeString } from "./utilities";
import { Exporter } from "./types";

export const CSV: Exporter<string> = {
    match: {
        stringify: (db: MatchState[]) => {
            // a hacky csv generator to conform to Mady's data structure
            const table = Object.values(db).map((row) =>
                Object.entries(row)
                    .map(([key, val]): string => {
                        if (typeof val === "boolean")
                            return JSON.stringify(val);
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
        blobify: (db: MatchState[]) =>
            new Blob([CSV.match.stringify(db)], { type: "text/csv" }),

        parse: () => [],
        deblobify: () => [],
    },
    pit: {
        stringify: (db: PitState[]) => {
            // a hacky csv generator to conform to Mady's data structure
            const table = Object.values(db).map((row) =>
                Object.entries(row)
                    .map(([key, val]): string => {
                        if (typeof val === "boolean")
                            return JSON.stringify(val);
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
        blobify: (db: PitState[]) =>
            new Blob([CSV.pit.stringify(db)], { type: "text/csv" }),

        parse: () => [],
        deblobify: () => [],
    },
};
