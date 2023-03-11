import { Checkbox, NumberInput, Select, Title } from "@mantine/core";
import { FC, useEffect } from "react";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { scouterOptions } from "../../data/scouters";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { MatchLevel } from "../../stores/match/matchTypes";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";
import { useTeamDB } from "../../stores/thebluealliance/teamDB";

export const Meta: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        scouter,
        matchLevel,
        matchNumber,
        teamNoShow,
        teamNumber: activeMatchGeneratedTeamNumber,
    } = useActiveMatch((state) => state);

    const errors = useActiveMatchErrors();

    const teamDBGeneratedNumber = useTeamDB((state) => state.getTeamNumber)(
        matchNumber
    );

    useEffect(() => {
        if (!teamDBGeneratedNumber) return;

        if (teamDBGeneratedNumber !== activeMatchGeneratedTeamNumber) {
            set("teamNumber")(teamDBGeneratedNumber);
            console.dir({
                teamDBGeneratedNumber,
            });
        }
    });

    return (
        <StackValidationChecker>
            <Title align="center">
                Match Information{" "}
                {activeMatchGeneratedTeamNumber
                    ? `for Team ${activeMatchGeneratedTeamNumber}`
                    : ""}
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
                    set("teamNumber")(activeMatchGeneratedTeamNumber ?? 0);
                }}
                error={errors.matchNumber}
                placeholder="Match Number"
                label="Match Number"
                size="lg"
                my={4}
            />

            <NumberInput
                value={activeMatchGeneratedTeamNumber}
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
