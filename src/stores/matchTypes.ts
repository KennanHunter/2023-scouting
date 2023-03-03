import { FieldPoint } from "../components/FieldInput";
import { GridData } from "../components/GridInput";
import { ParkState } from "./activeMatch";

export type MatchState = {
    scouter: string;

    autonomousStartingLocation?: FieldPoint;
    autonomousLeftCommunityZone: boolean;
    autonomousGridData?: GridData;
    autonomousDockedToChargeStation: boolean;
    autonomousChargeStationEngaged: boolean;

    teleopGroundPickups: number;
    teleopSubstation1Pickups: number;
    teleopSubstation2LowPickups: number;
    teleopSubstation2HighPickups: number;
    teleopGridData?: GridData;

    endgameParking: ParkState;
    endgameTippedChargeStation: boolean;
    endgameRobotsDocked: number;

    mechanicalFailures: string;
    comments: string;
};
