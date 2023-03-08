import { AutoParkState, DefenseRating, EndgameParkState, MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { gridUtilities } from "../../util/gridUtilities";
import { escapeString, wrapString } from "./utilities";
import { Exporter } from "./types";

export const MadyCSV: Exporter<string> = {
    match: {
        stringify: (db: MatchState[]) => {
            // a hacky csv generator to conform to Mady's data structure
            // @cspell:disable
            const header: string = [
                "EventKey",
                "MatchLevel",
                "MatchNumber",
                "Team",
                "ScoutName",
                "NoShow",
                "LeftCommunity",
                "A-TopCones",
                "A-TopCubes",
                "A-MiddleCones",
                "A-MiddleCubes",
                "A-BottomCones",
                "A-BottomCubes",
                "ChargingStation",
                "T-TopCones",
                "T-TopCubes",
                "T-MiddleCones",
                "T-MiddleCubes",
                "T-BottomCones",
                "T-BottomCubes",
                "PickupLocations",
                "DiedonField",
                "RunnerRobot",
                "DefenseRating",
                "ChargingStation",
                "RobotsDocked",
                "Comments",
                "LinksCompleted",
                "CoopertitionBonus",
                "ScoutedTime",
            ]
                .map(escapeString)
                .map(wrapString)
                .join(",");
            // @cspell:enable

            return [
                header,
                ...db.map((row): string => {
                    const autonomousGrid = gridUtilities(
                        row.autonomousGridData
                    );
                    const teleopGrid = gridUtilities(row.teleopGridData as any);

                    return [
                        "",
                        row.matchLevel,
                        row.scouter,
                        row.teamNoShow,
                        row.teamNumber,
                        row.autonomousLeftCommunityZone,
                        autonomousGrid.coneColumnsTotals.level2,
                        autonomousGrid.cubeColumnsTotals.level2,
                        autonomousGrid.coneColumnsTotals.level1,
                        autonomousGrid.cubeColumnsTotals.level1,
                        autonomousGrid.coneColumnsTotals.hybrid,
                        autonomousGrid.cubeColumnsTotals.hybrid,
                        AutoParkState().options.indexOf(row.autonomousParking),
                        teleopGrid.coneColumnsTotals.level2,
                        teleopGrid.cubeColumnsTotals.level2,
                        teleopGrid.coneColumnsTotals.level1,
                        teleopGrid.cubeColumnsTotals.level1,
                        teleopGrid.coneColumnsTotals.hybrid,
                        teleopGrid.cubeColumnsTotals.hybrid,
                        [
                            ((row.teleopGroundPickups != 0) ? "0": ""),
                            ((row.teleopSubstation2HighPickups != 0) ? "1": ""), 
                            (((row.teleopSubstation1Pickups + row.teleopSubstation2LowPickups) != 0) ? "2": "")
                        ].join(" "),
                        row.diedOnField,
                        row.teleopRunnerRobot,
                        DefenseRating().options.indexOf(row.defenseRating),
                        EndgameParkState().options.indexOf(row.endgameParking),
                        row.endgameRobotsDocked,
                        row.comments,
                        row.endgameLinksCompleted,
                        row.endgameCoopertitionBonus,
                        row.time ? new Date(row.time).toString() : new Date().toString(),
                    ]
                        .map(String)
                        .map(escapeString)
                        .map(wrapString)
                        .join(",");
                }),
            ].join("\n");
        },
        blobify: (db: MatchState[]) =>
            new Blob([MadyCSV.match.stringify(db)], { type: "text/csv" }),

        parse: () => [],
        deblobify: () => [],
    },
    pit: {
        stringify: (db: PitState[]) => {
            // a hacky csv generator to conform to Mady's data structure
            // @cspell:disable
            const header: string = [
                "TeamNumber",
                "Height",
                "Length",
                "Width",
                "Weight",
                "Wheredoyougetgamepieces?",
                "CanDockIn:",
                "CanEngageIn:",
                "WhatGamePiecesCanYouPlace?",
                "ExitCommunity?",
                "GridLocations",
                "#AutoPrograms",
                "GridLocations",
                "PlaysDefense",
                "Scavenger/RunnerBot",
                "ScoutedTime",
            ]
                .map(escapeString)
                .map(wrapString)
                .join(",");
            // @cspell:enable

            return [
                header,
                ...db.map((row: PitState): string => {
                    return [
                        row.teamNumber,
                        row.robotHeight,
                        row.robotLength,
                        [
                            (row.robotCanPickupRamp ? "0": ""), 
                            (row.robotCanPickupFloor ? "2": ""),
                            (row.robotCanPickupShelf ? "1": "")
                        ].join(" "),
                        [
                            (row.robotCanDockAuto ? "0": ""), 
                            (row.robotCanDockTeleop ? "1": "")
                        ].join(" "),
                        [
                            (row.robotCanEngageAuto ? "0": ""), 
                            (row.robotCanEngageTeleop ? "1": "")
                        ].join(" "),
                        [
                            (row.robotCanManipulateCone ? "0": ""), 
                            (row.robotCanManipulateCube ? "1": "")
                        ].join(" "),
                        row.autonomousCanExitCommunity,
                        [
                            (row.autonomousGridPlaceTop ? "0": ""),
                            (row.autonomousGridPlaceMiddle ? "1": ""), 
                            (row.autonomousGridPlaceBottom ? "2": "")
                        ].join(" "),
                        row.autonomousNumberOfPrograms,
                        [
                            (row.teleopGridPlaceTop ? "0": ""),
                            (row.teleopGridPlaceMiddle ? "1": ""), 
                            (row.teleopGridPlaceBottom ? "2": "")
                        ].join(" "),
                        row.teleopPlaysDefense,
                        row.teleopRunnerRobot,
                        row.time ? new Date(row.time).toString() : new Date().toString(),
                    ]
                        .map(String)
                        .map(escapeString)
                        .map(wrapString)
                        .join(",");
                }),
            ].join("\n");
        },
        blobify: (db: PitState[]) =>
            new Blob([MadyCSV.pit.stringify(db)], { type: "text/csv" }),

        parse: () => [],
        deblobify: (blob: Blob) => [],
    },
};
