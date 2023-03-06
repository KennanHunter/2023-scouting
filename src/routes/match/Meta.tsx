import { Checkbox, NumberInput, Select, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { scouterOptions } from "../../data/scouters";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { MatchLevel } from "../../stores/match/matchTypes";

export const Meta: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const { scouter, matchLevel, matchNumber, teamNumber, teamNoShow } =
        useActiveMatch((state) => state);

    return (
        <Stack>
            <Title align="center">Match Information</Title>

            <Select
                label={"Scouter"}
                size="lg"
                searchable
                data={scouterOptions}
                value={scouter}
                onChange={set("scouter")}
                my={4}
                error={scouter ? undefined : "You must select your name"}
            />

            <Select
                label={"Match Level"}
                size="lg"
                searchable
                data={MatchLevel().options}
                value={matchLevel}
                onChange={set("matchLevel")}
                my={4}
            />

            <NumberInput
                value={matchNumber}
                onChange={(value) => set("matchNumber")(value ?? 0)}
                error={
                    matchNumber <= 0
                        ? "You must set a match number!"
                        : undefined
                }
                placeholder="Match Number"
                label="Match Number"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teamNumber}
                onChange={(value) => set("teamNumber")(value ?? 0)}
                error={
                    teamNumber <= 0 ? "You must set a team number!" : undefined
                }
                placeholder="Team Number"
                label="Team Number"
                size="lg"
                my={4}
            />

            <Checkbox
                label="Team No Show"
                size="lg"
                my={8}
                checked={teamNoShow}
                onChange={(event) => {
                    set("teamNoShow")(event.target.checked);
                }}
            />
        </Stack>
    );
};
