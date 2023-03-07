import { z } from "zod";

export const DrivetrainType = () => z.enum(["None", "Tank", "Swerve", "Mecanum", "Holonomic"]);
export type DrivetrainType = z.infer<ReturnType<typeof DrivetrainType>>;

export const PitState = () =>
    z.object({
        scouter: z.string().refine((val) => val !== "", "Please select your name"),
        teamNumber: z
            .number()
            .max(20000, "No team numbers are this big")
            .positive("All team numbers are positive"),

        robotHeight: z.number().positive(),
        robotLength: z.number().positive(),
        robotWidth: z.number().positive(),
        robotWeight: z.number().positive(),

        robotDrivetrain: DrivetrainType(),
    
        robotCanPickupRamp: z.boolean(),
        robotCanPickupShelf: z.boolean(),
        robotCanPickupFloor: z.boolean(),
    
        robotCanDockAuto: z.boolean(),
        robotCanDockTeleop: z.boolean(),
    
        robotCanEngageAuto: z.boolean(),
        robotCanEngageTeleop: z.boolean(),
    
        robotCanManipulateCone: z.boolean(),
        robotCanManipulateCube: z.boolean(),
    
        autonomousCanExitCommunity: z.boolean(),
    
        autonomousGridPlaceTop: z.boolean(),
        autonomousGridPlaceMiddle: z.boolean(),
        autonomousGridPlaceBottom: z.boolean(),
    
        autonomousNumberOfPrograms: z.number().min(0),
    
        teleopGridPlaceTop: z.boolean(),
        teleopGridPlaceMiddle: z.boolean(),
        teleopGridPlaceBottom: z.boolean(),
    
        teleopPlaysDefense: z.boolean(),
    
        teleopRunnerRobot: z.boolean(),

        comments: z.string(),
    });
export type PitState = z.infer<ReturnType<typeof PitState>>;