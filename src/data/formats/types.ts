import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { CSV } from "./CSV";
import { MadyCSV } from "./MadyCSV";
import { JSONGzip } from "./JSONGzip";

export type Exporter<TExportType extends string | Uint8Array> = {
    match: {
        stringify: (db: MatchState[]) => TExportType;
        blobify: (db: MatchState[]) => Blob;

        parse: (data: TExportType) => MatchState[] | undefined;
        deblobify: (blob: Blob) => MatchState[] | undefined;
    };
    pit: {
        stringify: (db: PitState[]) => TExportType;
        blobify: (db: PitState[]) => Blob;

        parse: (data: TExportType) => PitState[] | undefined;
        deblobify: (blob: Blob) => PitState[] | undefined;
    };
};

export const exporters: Record<string, Exporter<any>> = {
    CSV: CSV,
    "Mady CSV": MadyCSV,
    "Gzipped JSON": JSONGzip,
};
