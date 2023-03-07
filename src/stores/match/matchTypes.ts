import { z } from "zod";
import { FieldPoint } from "../../components/FieldInput";
import { GridData } from "../../components/GridInput";

export const ParkState = () => z.enum(["DockEngage", "Dock", "Park", "None"]);
export type ParkState = z.infer<ReturnType<typeof ParkState>>;

export const MatchLevel = () =>
    z.enum(["Qualifications", "Quarterfinals", "Semifinals", "Finals"]);
export type MatchLevel = z.infer<ReturnType<typeof MatchLevel>>;

export const MatchState = () =>
    z.object({
        scouter: z.string().refine((val) => val !== ""),
        matchLevel: MatchLevel(),
        matchNumber: z.number().positive("Match number must be positive"),
        teamNumber: z
            .number()
            .max(20000, "No team numbers are this big")
            .positive("All team numbers are positive"),

        teamNoShow: z.boolean(),

        autonomousStartingLocation: FieldPoint(),
        autonomousLeftCommunityZone: z.boolean(),
        autonomousGridData: GridData(),
        autonomousDockedToChargeStation: z.boolean(),
        autonomousChargeStationEngaged: z.boolean(),

        teleopGroundPickups: z.number().positive(),
        teleopSubstation1Pickups: z.number().positive(),
        teleopSubstation2LowPickups: z.number().positive(),
        teleopSubstation2HighPickups: z.number().positive(),
        teleopGridData: GridData(),

        endgameParking: ParkState(),
        endgameTippedChargeStation: z.boolean(),
        endgameRobotsDocked: z.number(),
        endgameLinksCompleted: z.number(),

        diedOnField: z.boolean(),
        comments: z.string(),
    });
export type MatchState = z.infer<ReturnType<typeof MatchState>>;
