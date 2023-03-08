import { showNotification } from "@mantine/notifications";
import pako from "pako";
import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { Exporter } from "./types";

const bytePacker = (data: Uint8Array): Uint8Array => {
    let chunks: number[][] = new Array(Math.ceil(data.length / 7))
        .fill([])
        .map(() => []);

    data.forEach((value, index) => {
        chunks[Math.floor(index / 7)].push(value);
    });

    let repackedData: number[] = [];

    chunks.forEach((chunk) => {
        repackedData.push(
            chunk.reduce(
                (bitmap, value, index) =>
                    (bitmap += (value > 0x7f ? 1 : 0) << index),
                0
            ),
            ...chunk.map((value) => (value > 0x7f ? value - 0x80 : value))
        );
    });

    return new Uint8Array(repackedData);
};

const byteUnpacker = (data: Uint8Array): Uint8Array => {
    let chunks: number[][] = new Array(Math.ceil(data.length / 8))
        .fill([])
        .map(() => []);

    data.forEach((value, index) => {
        chunks[Math.floor(index / 8)].push(value);
    });

    let unpackedData: number[] = [];

    chunks.forEach((chunk) => {
        const chunkHeader = chunk.shift() ?? 0;
        unpackedData.push(
            ...chunk.map((value, index) =>
                (chunkHeader & (1 << index)) != 0 ? value + 0x80 : value
            )
        );
    });

    return new Uint8Array(unpackedData);
};

export const JSONGzip: Exporter<Uint8Array> = {
    exportType: "binary",
    mimeType: "application/gzip.7be",
    match: {
        stringify: (db: MatchState[]) => {
            return bytePacker(
                pako.deflate(new TextEncoder().encode(JSON.stringify(db)))
            );
        },
        blobify: (db: MatchState[]) =>
            new Blob([JSONGzip.match.stringify(db)], {
                type: JSONGzip.mimeType,
            }),

        parse: (rawInput: Uint8Array) => {
            let rawQRCodeInput: any;
            try {
                rawQRCodeInput = JSON.parse(
                    new TextDecoder().decode(
                        pako.inflate(byteUnpacker(rawInput))
                    )
                );
            } catch (e) {
                return undefined;
            }

            const QRCodeParseResult = MatchState()
                .array()
                .safeParse(rawQRCodeInput);

            console.log(QRCodeParseResult);

            if (!QRCodeParseResult.success) return undefined;

            return QRCodeParseResult.data;
        },
        deblobify: async (blob: Blob) => [],
    },
    pit: {
        stringify: (db: PitState[]) => {
            return bytePacker(
                pako.deflate(new TextEncoder().encode(JSON.stringify(db)))
            );
        },
        blobify: (db: PitState[]) =>
            new Blob([JSONGzip.pit.stringify(db)], {
                type: JSONGzip.mimeType,
            }),

        parse: (rawInput: Uint8Array) => {
            let rawQRCodeInput: any;
            try {
                rawQRCodeInput = JSON.parse(
                    new TextDecoder().decode(
                        pako.inflate(byteUnpacker(rawInput))
                    )
                );
            } catch {
                return undefined;
            }

            const QRCodeParseResult = PitState()
                .array()
                .safeParse(rawQRCodeInput);

            if (!QRCodeParseResult.success) return undefined;

            return QRCodeParseResult.data;
        },
        deblobify: async (blob: Blob) => [],
    },
};
