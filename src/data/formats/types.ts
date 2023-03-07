import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { CSV } from "./CSV";
import { MadyCSV } from "./MadyCSV";
import { JSONGzip } from "./JSONGzip";

export type Exporter<TExportType extends string | Uint8Array> = {
    match: {
        stringify: (db: MatchState[]) => TExportType;
        blobify: (db: MatchState[]) => Blob;

        parse: (data: TExportType) => MatchState[];
        deblobify: (blob: Blob) => MatchState[];
    };
    pit: {
        stringify: (db: PitState[]) => TExportType;
        blobify: (db: PitState[]) => Blob;

        parse: (data: TExportType) => PitState[];
        deblobify: (blob: Blob) => PitState[];
    };
};

export const exporters: Record<string, Exporter<any>> = {
    CSV: CSV,
    "Mady CSV": MadyCSV,
    "Gzipped JSON": JSONGzip,
};
