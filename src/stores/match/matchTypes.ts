import { z } from "zod";
import { FieldPoint } from "../../components/FieldInput";
import { GridData } from "../../components/GridInput";
import { gridUtilities } from "../../util/gridUtilities";
import { TeamPosition } from "../thebluealliance/teamTypes";

export const AutoParkState = () => z.enum(["None", "DockEngage", "Dock"]);
export type AutoParkState = z.infer<ReturnType<typeof AutoParkState>>;

export const EndgameParkState = () =>
    z.enum(["None", "DockEngage", "Dock", "Park"]);
export type EndgameParkState = z.infer<ReturnType<typeof EndgameParkState>>;

export const DefenseRating = () =>
    z.enum(["Not Played", "Not Effective", "Effective", "Very Effective"]);
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

        autonomousGridData: GridData()
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.coneColumnsTotals.level2 <= 6;
            }, "Too many cones on high row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.coneColumnsTotals.level1 <= 6;
            }, "Too many cones on middle row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.coneColumnsTotals.hybrid <= 9;
            }, "Too many cones on the bottom row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.cubeColumnsTotals.level2 <= 3;
            }, "Too many cubes on high row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.cubeColumnsTotals.level1 <= 3;
            }, "Too many cubes on middle row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.cubeColumnsTotals.hybrid <= 9;
            }, "Too many cubes on the bottom row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return (
                    gridData.coneColumnsTotals.hybrid +
                        gridData.cubeColumnsTotals.hybrid <=
                    9
                );
            }, "Too many game pieces on the bottom row"),

        autonomousParking: AutoParkState(),

        teleopGroundPickups: z.number().min(0),
        teleopSubstation1Pickups: z.number().min(0),
        teleopSubstation2LowPickups: z.number().min(0),
        teleopSubstation2HighPickups: z.number().min(0),
        teleopRunnerRobot: z.boolean(),
        teleopGridData: GridData()
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.coneColumnsTotals.level2 <= 6;
            }, "Too many cones on high row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.coneColumnsTotals.level1 <= 6;
            }, "Too many cones on middle row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.coneColumnsTotals.hybrid <= 9;
            }, "Too many cones on the bottom row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.cubeColumnsTotals.level2 <= 3;
            }, "Too many cubes on high row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.cubeColumnsTotals.level1 <= 3;
            }, "Too many cubes on middle row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return gridData.cubeColumnsTotals.hybrid <= 9;
            }, "Too many cubes on the bottom row")
            .refine((data) => {
                const gridData = gridUtilities(data);

                return (
                    gridData.coneColumnsTotals.hybrid +
                        gridData.cubeColumnsTotals.hybrid <=
                    9
                );
            }, "Too many game pieces on the bottom row"),

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
