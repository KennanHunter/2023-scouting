import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { escapeString } from "./utilities";
import { Exporter } from "./types";
import pako from "pako";

export const JSONGzip : Exporter<Uint8Array> = {
    match: {
        stringify: (db: MatchState[]) => {
            return pako.deflate(new TextEncoder().encode(JSON.stringify(db)));
        },
        blobify: (db: MatchState[]): Blob =>
            new Blob([JSONGzip.match.stringify(db)], { type: "application/gzip" }),
    },
    pit: {
        stringify: (db: PitState[]) => {
            return pako.deflate(new TextEncoder().encode(JSON.stringify(db)));
        },
        blobify: (db: PitState[]): Blob =>
            new Blob([JSONGzip.pit.stringify(db)], { type: "application/gzip" }),
    }
};
