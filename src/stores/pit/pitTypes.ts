export type PitState = {
    scouter: string;
    teamNumber: number;

    robotHeight: number;
    robotLength: number;
    robotWidth: number;
    robotWeight: number;

    robotCanPickupRamp: boolean;
    robotCanPickupShelf: boolean;
    robotCanPickupFloor: boolean;

    robotCanDockAuto: boolean;
    robotCanDockTeleop: boolean;

    robotCanEngageAuto: boolean;
    robotCanEngageTeleop: boolean;

    robotCanManipulateCone: boolean;
    robotCanManipulateCube: boolean;

    autonomousCanExitCommunity: boolean;

    autonomousGridPlaceTop: boolean;
    autonomousGridPlaceMiddle: boolean;
    autonomousGridPlaceBottom: boolean;

    autonomousNumberOfPrograms: number;

    teleopGridPlaceTop: boolean;
    teleopGridPlaceMiddle: boolean;
    teleopGridPlaceBottom: boolean;

    teleopPlaysDefense: boolean;

    teleopRunnerRobot: boolean;
};
