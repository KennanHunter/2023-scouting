import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { Exporter } from "./types";

export const SimpleJSON: Exporter<string> = {
    exportType: "string",
    mimeType: "application/json",
    match: {
        stringify: (db: MatchState[]) => JSON.stringify(db),
        blobify: (db: MatchState[]) =>
            new Blob([SimpleJSON.match.stringify(db)], {
                type: SimpleJSON.mimeType,
            }),

        parse: (rawInput) => {
            const rawQRCodeInput = JSON.parse(rawInput);

            const QRCodeParseResult = MatchState()
                .array()
                .safeParse(rawQRCodeInput);

            if (!QRCodeParseResult.success) return undefined;

            return QRCodeParseResult.data;
        },
        deblobify: async (blob: Blob) =>
            SimpleJSON.match.parse(await blob.text()),
    },
    pit: {
        stringify: (db: PitState[]) => {
            return JSON.stringify(db);
        },
        blobify: (db: PitState[]) =>
            new Blob([SimpleJSON.pit.stringify(db)], {
                type: SimpleJSON.mimeType,
            }),

        parse: (rawInput) => {
            const rawQRCodeInput = JSON.parse(rawInput);

            const QRCodeParseResult = PitState()
                .array()
                .safeParse(rawQRCodeInput);

            if (!QRCodeParseResult.success) return undefined;

            return QRCodeParseResult.data;
        },
        deblobify: async (blob: Blob) =>
            SimpleJSON.pit.parse(await blob.text()),
    },
};
