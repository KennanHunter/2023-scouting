import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { escapeString } from "./utilities";
import { Exporter } from "./types";

export const JSONGzip : Exporter = {
    match: {
        stringify: (db: MatchState[]): string => {
            console.log(JSON.stringify(db))
            
            return ""
        },
        blobify: (db: MatchState[]): Blob =>
            new Blob([JSONGzip.match.stringify(db)], { type: "application/gzip" }),
    },
    pit: {
        stringify: (db: PitState[]): string => {
            
            return ""
        },
        blobify: (db: PitState[]): Blob =>
            new Blob([JSONGzip.pit.stringify(db)], { type: "application/gzip" }),
    }
};
