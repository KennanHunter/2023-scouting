import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { Exporter } from "./types";
import { escapeString } from "./utilities";

export const CSV: Exporter<string> = {
    exportType: "string",
    mimeType: "text/csv",
    match: {
        stringify: (db: MatchState[]) => {
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
            new Blob([CSV.match.stringify(db)], { type: CSV.mimeType }),

        parse: () => [],
        deblobify: async () => [],
    },
    pit: {
        stringify: (db: PitState[]) => {
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
            new Blob([CSV.pit.stringify(db)], { type: CSV.mimeType }),

        parse: () => [],
        deblobify: async () => [],
    },
};
