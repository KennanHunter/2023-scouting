import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { CSV } from "./CSV";
import { JSONGzip } from "./JSONGzip";
import { MadyCSV } from "./MadyCSV";

export type Exporter<TExportType extends string | Uint8Array> = {
    match: {
        stringify: (db: MatchState[]) => TExportType;
        blobify: (db: MatchState[]) => Blob;

        parse: (data: TExportType) => MatchState[] | undefined;
        deblobify: (blob: Blob) => Promise<MatchState[] | undefined>;
    };
    pit: {
        stringify: (db: PitState[]) => TExportType;
        blobify: (db: PitState[]) => Blob;

        parse: (data: TExportType) => PitState[] | undefined;
        deblobify: (blob: Blob) => Promise<PitState[] | undefined>;
    };
};

export const exporters: Record<string, Exporter<any>> = {
    CSV: CSV,
    "Mady CSV": MadyCSV,
    "7-Bit Gzipped JSON": JSONGzip,
};
