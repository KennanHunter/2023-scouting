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

    robotCanPlaceCone: boolean;
    robotCanPlaceCube: boolean;

    autonomousCanExitCommunity: boolean;

    autonomousGridPlaceTop: number;
    autonomousGridPlaceMiddle: number;
    autonomousGridPlaceBottom: number;

    autonomousNumberOfPrograms: number;

    teleopGridPlaceTop: boolean;
    teleopGridPlaceMiddle: boolean;
    teleopGridPlaceBottom: boolean;

    teleopPlaysDefense: boolean;

    teleopRunnerRobot: boolean;
};
