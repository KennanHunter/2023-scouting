import { MatchState } from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { gridUtilities } from "../../util/gridUtilities";
import { escapeString, wrapString } from "./utilities";
import { Exporter } from "./types";

export const MadyCSV : Exporter<string> = {
    match: {
        stringify: (db: MatchState[]) => {
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
                        row.autonomousChargeStationEngaged,
                        teleopGrid.coneColumnsTotals.level2,
                        teleopGrid.cubeColumnsTotals.level2,
                        teleopGrid.coneColumnsTotals.level1,
                        teleopGrid.cubeColumnsTotals.level1,
                        teleopGrid.coneColumnsTotals.hybrid,
                        teleopGrid.cubeColumnsTotals.hybrid,
                        "", // TODO: implement PickupLocations
                        row.diedOnField,
                        "false", // TODO: Runner robot
                        "0", // TODO: Defense rating
                        row.endgameTippedChargeStation,
                        row.endgameRobotsDocked,
                        row.comments,
                        row.endgameLinksCompleted,
                        "false", // TODO: Cooperation bonus
                        row.time.toString(),
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
    },
    pit: {
        stringify: (db: PitState[]) => {
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
                        "", // TODO: Implement WhereDoYouGetYourGamePieces
                        "", // TODO: Implement canDockIn
                        "", // TODO: Implement canEngageIn
                        "", // TODO: Implement WhatGamePiecesCanYouPlace?
                        row.autonomousCanExitCommunity,
                        "", // TODO: Implement GridLocation for auto
                        row.autonomousNumberOfPrograms,
                        "", // TODO: Implement GridLocation for teleop
                        row.teleopPlaysDefense,
                        row.teleopRunnerRobot,
                        row.time.toString(),
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
    },
};
