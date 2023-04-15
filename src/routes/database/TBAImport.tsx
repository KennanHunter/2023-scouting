import {
    Badge,
    Button,
    Divider,
    Select,
    Stack,
    Table,
    TextInput,
} from "@mantine/core";
import { IconKey } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useTeamDB } from "../../stores/thebluealliance/teamDB";
import { TeamPosition } from "../../stores/thebluealliance/teamTypes";

const MatchesSchema = () =>
    z
        .object({
            key: z.string(),
            comp_level: z.string(),
            set_number: z.number(),
            match_number: z.number(),
            alliances: z.object({
                red: z.object({
                    score: z.number(),
                    team_keys: z.string().array(),
                    surrogate_team_keys: z.string().array(),
                    dq_team_keys: z.string().array(),
                }),
                blue: z.object({
                    score: z.number(),
                    team_keys: z.string().array(),
                    surrogate_team_keys: z.string().array(),
                    dq_team_keys: z.string().array(),
                }),
            }),
            winning_alliance: z.string(),
            event_key: z.string(),
            time: z.number(),
            actual_time: z.number().nullable(),
            predicted_time: z.number(),
            post_result_time: z.number().nullable(),
            score_breakdown: z.unknown().nullable(),
            videos: z
                .object({
                    type: z.string(),
                    key: z.string(),
                })
                .array(),
        })
        .array();

export const TBAImport: FC = () => {
    const teamDB = useTeamDB((state) => state);
    const { eventKey, setEventKey } = teamDB;

    const [isLoadingMatches, setIsLoadingMatches] = useState<boolean>(false);

    const [fetchError, setFetchError] = useState<string>("");
    const [fetchSucceeded, setFetchSucceeded] = useState<boolean>(
        teamDB.db.length > 0
    );

    const fetchMatches = () => {
        setIsLoadingMatches(true);

        fetch(
            `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`,
            {
                method: "GET",
                headers: {
                    "x-tba-auth-key": import.meta.env.VITE_TBA_API_KEY ?? "",
                },
            }
        )
            .then(async (response: Response) => {
                setFetchError("");
                setFetchSucceeded(true);

                const responseJson = await response.json();
                const safelyParsedJson =
                    MatchesSchema().safeParse(responseJson);

                if (!safelyParsedJson.success) {
                    switch (response.status) {
                        case 401:
                            setFetchError(
                                "Authorization Error, Please Ask Kennan"
                            );
                            break;
                        case 404:
                            setFetchError(
                                "Event Not Found, Please Check your Event Key"
                            );
                            break;
                        default:
                            setFetchError(
                                "Event Data Corrupt, Please Ask Kennan"
                            );
                            break;
                    }

                    setFetchSucceeded(false);

                    setIsLoadingMatches(false);

                    return;
                }

                teamDB.clearDB();

                teamDB.push(
                    safelyParsedJson.data
                        .filter((match) => match.comp_level === "qm")
                        .map((match) => ({
                            matchLevel: "Qualifications",
                            matchNumber: match.match_number,

                            "Red 1": Number.parseInt(
                                match.alliances.red.team_keys[0].slice(3)
                            ),
                            "Red 2": Number.parseInt(
                                match.alliances.red.team_keys[1].slice(3)
                            ),
                            "Red 3": Number.parseInt(
                                match.alliances.red.team_keys[2].slice(3)
                            ),

                            "Blue 1": Number.parseInt(
                                match.alliances.blue.team_keys[0].slice(3)
                            ),
                            "Blue 2": Number.parseInt(
                                match.alliances.blue.team_keys[1].slice(3)
                            ),
                            "Blue 3": Number.parseInt(
                                match.alliances.blue.team_keys[2].slice(3)
                            ),
                        }))
                );

                setFetchError("");
                setFetchSucceeded(true);

                setIsLoadingMatches(false);
            })
            .catch((error) => {
                setFetchError(
                    "Failed to Fetch Matches, Please Check your Event Key"
                );
                setFetchSucceeded(false);

                setIsLoadingMatches(false);
            });
    };

    return (
        <Stack
            sx={{
                overflowX: "scroll",
                maxWidth: "90vw",
            }}
        >
            <Link to={"/"} style={{ all: "unset", flexGrow: 1 }}>
                <Button fullWidth my={4}>
                    Home
                </Button>
            </Link>

            <Divider my="xs" variant="dashed" />

            <TextInput
                icon={<IconKey />}
                label="Event Key"
                placeholder="Event Key"
                size="lg"
                value={eventKey}
                onChange={(value) => setEventKey(value.target.value)}
            />

            <Select
                label={"Scouter Position"}
                size="lg"
                data={TeamPosition().options}
                value={teamDB.teamPosition}
                onChange={(value) =>
                    teamDB.setTeamPosition(value as TeamPosition)
                }
                my={4}
            />

            <Button
                fullWidth
                my={4}
                sx={{ flexGrow: 1 }}
                loading={isLoadingMatches}
                onClick={() => {
                    if (!isLoadingMatches) fetchMatches();
                }}
            >
                Fetch Data
            </Button>

            <Button
                fullWidth
                my={4}
                sx={{ flexGrow: 1 }}
                onClick={() => {
                    teamDB.clear();
                    setFetchError("");
                    setFetchSucceeded(false);
                }}
            >
                Clear Data
            </Button>

            <Badge
                size="xl"
                color={
                    !fetchSucceeded && fetchError
                        ? "red"
                        : fetchSucceeded
                        ? "green"
                        : "gray"
                }
            >
                {!fetchSucceeded && fetchError
                    ? `Error: ${fetchError}`
                    : fetchSucceeded
                    ? "Data Imported Successfully!"
                    : "No Data Imported"}
            </Badge>

            {fetchSucceeded ? (
                <Table striped withBorder withColumnBorders my={4}>
                    <thead>
                        <tr>
                            <th>Match</th>
                            <th>Red 1</th>
                            <th>Red 2</th>
                            <th>Red 3</th>
                            <th>Blue 1</th>
                            <th>Blue 2</th>
                            <th>Blue 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamDB.db
                            .sort((a, b) =>
                                a.matchNumber > b.matchNumber ? 1 : -1
                            )
                            .map((match, index) => (
                                <tr key={`match#${index}`}>
                                    <td>
                                        {match.matchLevel} {match.matchNumber}
                                    </td>
                                    <td>{match["Red 1"]}</td>
                                    <td>{match["Red 2"]}</td>
                                    <td>{match["Red 3"]}</td>
                                    <td>{match["Blue 1"]}</td>
                                    <td>{match["Blue 2"]}</td>
                                    <td>{match["Blue 3"]}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            ) : null}
        </Stack>
    );
};
