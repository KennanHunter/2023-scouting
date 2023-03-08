import { z } from "zod";
import { GridColumn, GridData, initGridData } from "../../components/GridInput";
import {
    AutoParkState,
    DefenseRating,
    EndgameParkState,
    MatchState,
} from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { gridUtilities } from "../../util/gridUtilities";
import { Exporter } from "./types";
import { escapeString, wrapString } from "./utilities";

// @cspell:disable
const headersArray = [
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
] as const;

export const MadyCSV: Exporter<string> = {
    exportType: "string",
    match: {
        stringify: (db: MatchState[]) => {
            // a hacky csv generator to conform to Mady's data structure
            const header: string = headersArray
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
                            row.teleopGroundPickups != 0 ? "0" : "",
                            row.teleopSubstation2HighPickups != 0 ? "1" : "",
                            row.teleopSubstation1Pickups +
                                row.teleopSubstation2LowPickups !=
                            0
                                ? "2"
                                : "",
                        ].join(" "),
                        row.diedOnField,
                        row.teleopRunnerRobot,
                        DefenseRating().options.indexOf(row.defenseRating),
                        EndgameParkState().options.indexOf(row.endgameParking),
                        row.endgameRobotsDocked,
                        row.comments,
                        row.endgameLinksCompleted,
                        row.endgameCoopertitionBonus,
                        row.time
                            ? new Date(row.time).toString()
                            : new Date().toString(),
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

        parse: (stringBlob) => {
            const lines = stringBlob.split("\n");

            const extractFromQuotations = (s: string): string[] =>
                (s.split(/(?<=(?<!\\)"),/gmu).splice(1, -1) as string[]) || [];

            const header = extractFromQuotations(
                lines[0]
            ) as (typeof headersArray)[number][];

            const records = lines.slice(1).map((val, index) =>
                extractFromQuotations(val).reduce(
                    (prev, cur, index, arr) => ({
                        ...prev,
                        [header[index]]: cur,
                    }),
                    {} as Record<(typeof headersArray)[number], string>
                )
            );
            const debooleanify = (val: string): boolean =>
                z.boolean().parse(JSON.parse(val));

            return records.map(
                (record): Partial<MatchState> => ({
                    scouter: record["ScoutName"],
                    matchLevel: record["MatchLevel"] as any,
                    matchNumber: Number(record["MatchNumber"]),
                    teamNumber: Number(record["Team"]),

                    teamNoShow: debooleanify(record["NoShow"]),

                    // autonomousStartingLocation:,
                    autonomousLeftCommunityZone: debooleanify(
                        record["LeftCommunity"]
                    ),
                    autonomousGridData: initGridData(),
                    // autonomousParking:,

                    // teleopGroundPickups:,
                    // teleopSubstation1Pickups: ,
                    // teleopSubstation2LowPickups: ,
                    // teleopSubstation2HighPickups:,
                    // teleopRunnerRobot: ,
                    // teleopGridData:,

                    // endgameParking:,
                    // endgameCoopertitionBonus:,
                    // endgameRobotsDocked: ,
                    // endgameLinksCompleted:,

                    // defenseRating: ,
                    // diedOnField: ,
                    // comments: ,

                    // time: ,
                })
            ) as any;
        },

        deblobify: async (blob: Blob) => MadyCSV.match.parse(await blob.text()),
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
                            row.robotCanPickupRamp ? "0" : "",
                            row.robotCanPickupFloor ? "2" : "",
                            row.robotCanPickupShelf ? "1" : "",
                        ].join(" "),
                        [
                            row.robotCanDockAuto ? "0" : "",
                            row.robotCanDockTeleop ? "1" : "",
                        ].join(" "),
                        [
                            row.robotCanEngageAuto ? "0" : "",
                            row.robotCanEngageTeleop ? "1" : "",
                        ].join(" "),
                        [
                            row.robotCanManipulateCone ? "0" : "",
                            row.robotCanManipulateCube ? "1" : "",
                        ].join(" "),
                        row.autonomousCanExitCommunity,
                        [
                            row.autonomousGridPlaceTop ? "0" : "",
                            row.autonomousGridPlaceMiddle ? "1" : "",
                            row.autonomousGridPlaceBottom ? "2" : "",
                        ].join(" "),
                        row.autonomousNumberOfPrograms,
                        [
                            row.teleopGridPlaceTop ? "0" : "",
                            row.teleopGridPlaceMiddle ? "1" : "",
                            row.teleopGridPlaceBottom ? "2" : "",
                        ].join(" "),
                        row.teleopPlaysDefense,
                        row.teleopRunnerRobot,
                        row.time
                            ? new Date(row.time).toString()
                            : new Date().toString(),
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
        deblobify: async (blob: Blob) => [],
    },
};
