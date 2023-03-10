import { z } from "zod";
import { FieldPoint } from "../../components/FieldInput";
import { GridData } from "../../components/GridInput";
import { TeamPosition } from "../thebluealliance/teamTypes";

export const AutoParkState = () => z.enum(["None", "DockEngage", "Dock"]);
export type AutoParkState = z.infer<ReturnType<typeof AutoParkState>>;

export const EndgameParkState = () =>
    z.enum(["None", "DockEngage", "Dock", "Park"]);
export type EndgameParkState = z.infer<ReturnType<typeof EndgameParkState>>;

export const DefenseRating = () =>
    z.enum(["Not Played", "Average", "Effective", "Very Effective"]);
export type DefenseRating = z.infer<ReturnType<typeof DefenseRating>>;

export const MatchLevel = () =>
    z.enum(["Qualifications", "Quarterfinals", "Semifinals", "Finals"]);
export type MatchLevel = z.infer<ReturnType<typeof MatchLevel>>;

export const MatchState = () =>
    z.object({
        eventCode: z.string().optional(),
        side: TeamPosition().optional(),
        scouter: z
            .string()
            .refine((val) => val !== "", "Please select your name"),
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
        autonomousParking: AutoParkState(),

        teleopGroundPickups: z.number().min(0),
        teleopSubstation1Pickups: z.number().min(0),
        teleopSubstation2LowPickups: z.number().min(0),
        teleopSubstation2HighPickups: z.number().min(0),
        teleopRunnerRobot: z.boolean(),
        teleopGridData: GridData(),

        endgameParking: EndgameParkState(),
        endgameCoopertitionBonus: z.boolean(),
        endgameRobotsDocked: z.number().min(0).max(3),
        endgameLinksCompleted: z.number().min(0).max(9),

        defenseRating: DefenseRating(),
        diedOnField: z.boolean(),
        comments: z.string(),

        time: z.number().optional(),
    });

export type MatchState = z.infer<ReturnType<typeof MatchState>>;
