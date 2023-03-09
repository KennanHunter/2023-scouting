import { z } from "zod";
import { initGridData } from "../../components/GridInput";
import {
    AutoParkState,
    DefenseRating,
    EndgameParkState,
    MatchState
} from "../../stores/match/matchTypes";
import { PitState } from "../../stores/pit/pitTypes";
import { gridUtilities, populateGridData } from "../../util/gridUtilities";
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
    mimeType: "text/csv",
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
                        "", // EventKey
                        row.matchLevel, // MatchLevel
                        row.matchNumber, // MatchNumber
                        row.teamNumber, // Team
                        row.scouter, // ScoutName
                        row.teamNoShow, //NoShow
                        row.autonomousLeftCommunityZone, // LeftCommunity
                        autonomousGrid.coneColumnsTotals.level2, // A-TopCones
                        autonomousGrid.cubeColumnsTotals.level2, // A-TopCubes
                        autonomousGrid.coneColumnsTotals.level1, // A-MiddleCones
                        autonomousGrid.cubeColumnsTotals.level1, // A-MiddleCubes
                        autonomousGrid.coneColumnsTotals.hybrid, // A-BottomCones
                        autonomousGrid.cubeColumnsTotals.hybrid, // A-BottomCubes
                        AutoParkState().options.indexOf(row.autonomousParking), // ChargingStation
                        teleopGrid.coneColumnsTotals.level2, // T-TopCones
                        teleopGrid.cubeColumnsTotals.level2, // T-TopCubes
                        teleopGrid.coneColumnsTotals.level1, // T-MiddleCones
                        teleopGrid.cubeColumnsTotals.level1, // T-MiddleCubes
                        teleopGrid.coneColumnsTotals.hybrid, // T-BottomCones
                        teleopGrid.cubeColumnsTotals.hybrid, // T-BottomCubes
                        [
                            row.teleopGroundPickups != 0 ? "0" : "",
                            row.teleopSubstation2HighPickups != 0 ? "1" : "",
                            row.teleopSubstation1Pickups +
                                row.teleopSubstation2LowPickups !=
                            0
                                ? "2"
                                : "",
                        ].join(" "), // PickupLocations
                        row.diedOnField, // DiedonField
                        row.teleopRunnerRobot, // RunnerRobot
                        DefenseRating().options.indexOf(row.defenseRating), // DefenseRating
                        EndgameParkState().options.indexOf(row.endgameParking), // ChargingStation
                        row.endgameRobotsDocked, // RobotsDocked
                        row.comments, // Comments
                        row.endgameLinksCompleted, // LinksCompleted
                        row.endgameCoopertitionBonus, // CoopertitionBonus
                        row.time
                            ? new Date(row.time).toString()
                            : new Date().toString(), // ScoutedTime
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

            const booleanify = (val: string): boolean =>
                z.boolean().parse(JSON.parse(val));
            const numberify = (val: string): number =>
                z.number().parse(JSON.parse(val));

            return records.map(
                (record): MatchState => ({
                    ...((): Pick<
                        MatchState,
                        | "teleopGroundPickups"
                        | "teleopSubstation1Pickups"
                        | "teleopSubstation2HighPickups"
                        | "teleopSubstation2LowPickups"
                    > => {
                        const pickupString = record["PickupLocations"];
                        return {
                            teleopGroundPickups: pickupString.includes("0")
                                ? 1
                                : 0,
                            teleopSubstation2HighPickups: pickupString.includes(
                                "1"
                            )
                                ? 1
                                : 0,
                            teleopSubstation1Pickups: pickupString.includes("2")
                                ? 1
                                : 0,
                            teleopSubstation2LowPickups: pickupString.includes(
                                "2"
                            )
                                ? 1
                                : 0,
                        };
                    })(),
                    autonomousGridData: populateGridData(initGridData(), {
                        cubeColumnsTotals: {
                            level2: numberify(record["A-TopCubes"]),
                            level1: numberify(record["A-MiddleCubes"]),
                            hybrid: numberify(record["A-BottomCubes"]),
                        },
                        coneColumnsTotals: {
                            level2: numberify(record["A-TopCones"]),
                            level1: numberify(record["A-MiddleCones"]),
                            hybrid: numberify(record["A-BottomCones"]),
                        },
                    }),
                    autonomousLeftCommunityZone: booleanify(
                        record["LeftCommunity"]
                    ),
                    autonomousParking: ((): "None" | "DockEngage" | "Dock" => {
                        const chargingStation = record["ChargingStation"];
                        if (chargingStation === "DockEngage")
                            return "DockEngage";
                        if (chargingStation === "Dock") return "Dock";
                        return "None";
                    })(),
                    autonomousStartingLocation: { x: 0.5, y: 0.5 },
                    comments: record["Comments"],
                    defenseRating:
                        DefenseRating().options[
                            numberify(record["DefenseRating"])
                        ],
                    diedOnField: booleanify(record["DiedonField"]),
                    endgameCoopertitionBonus: booleanify(
                        record["CoopertitionBonus"]
                    ),
                    endgameLinksCompleted: numberify(record["LinksCompleted"]),
                    endgameParking:
                        EndgameParkState().options[
                            numberify(record["RobotsDocked"])
                        ],
                    endgameRobotsDocked: numberify(record["RobotsDocked"]),
                    matchLevel: record["MatchLevel"] as any,
                    matchNumber: Number(record["MatchNumber"]),
                    scouter: record["ScoutName"],
                    teamNoShow: booleanify(record["NoShow"]),
                    teamNumber: Number(record["Team"]),
                    teleopGridData: populateGridData(initGridData(), {
                        cubeColumnsTotals: {
                            level2: numberify(record["T-TopCubes"]),
                            level1: numberify(record["T-MiddleCubes"]),
                            hybrid: numberify(record["T-BottomCubes"]),
                        },
                        coneColumnsTotals: {
                            level2: numberify(record["T-TopCones"]),
                            level1: numberify(record["T-MiddleCones"]),
                            hybrid: numberify(record["T-BottomCones"]),
                        },
                    }),
                    teleopRunnerRobot: booleanify(record["RunnerRobot"]),
                    time: new Date(record["ScoutedTime"]).valueOf(),
                })
            );
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
