import {
    Checkbox,
    NumberInput,
    Select,
    Stack,
    Title,
    Text,
} from "@mantine/core";
import { FC } from "react";
import { scouterOptions } from "../../data/scouters";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { MatchLevel } from "../../stores/match/matchTypes";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";
import { useTeamDB } from "../../stores/thebluealliance/teamDB";

export const Meta: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const { scouter, matchLevel, matchNumber, teamNoShow } = useActiveMatch(
        (state) => state
    );

    const errors = useActiveMatchErrors();

    const teamNumber = useTeamDB((state) => state.getTeamNumber)(matchNumber);

    return (
        <StackValidationChecker>
            <Title align="center">
                Match Information {teamNumber ? `for Team ${teamNumber}` : ""}
            </Title>

            <Select
                label={"Scouter"}
                size="lg"
                searchable
                data={scouterOptions}
                value={scouter}
                onChange={set("scouter")}
                my={4}
                error={errors.scouter}
            />

            <Select
                label={"Match Level"}
                size="lg"
                searchable
                data={MatchLevel().options}
                value={matchLevel}
                onChange={set("matchLevel")}
                my={4}
                error={errors.matchLevel}
            />

            <NumberInput
                value={matchNumber}
                onChange={(value) => {
                    set("matchNumber")(value ?? 0);
                    set("teamNumber")(teamNumber ?? 0);
                }}
                error={errors.matchNumber}
                placeholder="Match Number"
                label="Match Number"
                size="lg"
                my={4}
            />

            <NumberInput
                value={teamNumber}
                placeholder="No Team Selected"
                label="Your Team to Scout"
                size="lg"
                my={4}
                readOnly
            />

            <Checkbox
                label="Team No Show"
                size="lg"
                my={8}
                checked={teamNoShow}
                onChange={(event) => set("teamNoShow")(event.target.checked)}
                error={errors.teamNoShow}
            />
        </StackValidationChecker>
    );
};
