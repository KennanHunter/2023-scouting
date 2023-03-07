import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";

export type Exporter = {
    match: {
        stringify: (db: MatchState[]) => string;
        blobify: (db: MatchState[]) => Blob;
    },
    pit: {
        stringify: (db: PitState[]) => string;
        blobify: (db: PitState[]) => Blob;
    }
}