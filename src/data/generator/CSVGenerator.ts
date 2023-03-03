import { MatchState } from "../../stores/activeMatch";

export const CSVGenerator = (db: MatchState[]) : Blob => {
    // a hacky csv generator to conform to Mady's data structure

    return new Blob(["pain"], {type: 'text/csv'});
}