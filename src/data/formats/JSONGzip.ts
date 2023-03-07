import pako from "pako";
import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { Exporter } from "./types";

export const JSONGzip: Exporter<Uint8Array> = {
    match: {
        stringify: (db: MatchState[]) => {
            return pako.deflate(new TextEncoder().encode(JSON.stringify(db)));
        },
        blobify: (db: MatchState[]) =>
            new Blob([JSONGzip.match.stringify(db)], {
                type: "application/gzip",
            }),

        parse: () => [],
        deblobify: (blob: Blob) => [],
    },
    pit: {
        stringify: (db: PitState[]) => {
            return pako.deflate(new TextEncoder().encode(JSON.stringify(db)));
        },
        blobify: (db: PitState[]) =>
            new Blob([JSONGzip.pit.stringify(db)], {
                type: "application/gzip",
            }),

        parse: () => [],
        deblobify: (blob: Blob) => [],
    },
};
