import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";

export type Exporter<TExportType extends string | Uint8Array> = {
    match: {
        stringify: (db: MatchState[]) => TExportType;
        blobify: (db: MatchState[]) => Blob;
    },
    pit: {
        stringify: (db: PitState[]) => TExportType;
        blobify: (db: PitState[]) => Blob;
    }
}