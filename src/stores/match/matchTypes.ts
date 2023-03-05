import { z } from "zod";
import { FieldPoint } from "../../components/FieldInput";
import { GridData } from "../../components/GridInput";

export const ParkState = () => z.enum(["DockEngage", "Dock", "Park", "None"]);
export type ParkState = z.infer<ReturnType<typeof ParkState>>;

export const MatchLevel = () =>
    z.enum(["Qualifications", "Quarterfinals", "Semifinals", "Finals"]);
export type MatchLevel = z.infer<ReturnType<typeof MatchLevel>>;

export type MatchState = {
    scouter: string;
    matchLevel: MatchLevel;
    matchNumber: number;
    teamNumber: number;

    teamNoShow: boolean;

    autonomousStartingLocation?: FieldPoint;
    autonomousLeftCommunityZone: boolean;
    autonomousGridData: GridData;
    autonomousDockedToChargeStation: boolean;
    autonomousChargeStationEngaged: boolean;

    teleopGroundPickups: number;
    teleopSubstation1Pickups: number;
    teleopSubstation2LowPickups: number;
    teleopSubstation2HighPickups: number;
    teleopGridData: GridData;

    endgameParking: ParkState;
    endgameTippedChargeStation: boolean;
    endgameRobotsDocked: number;
    endgameLinksCompleted: number;

    diedOnField: boolean;
    comments: string;
};
