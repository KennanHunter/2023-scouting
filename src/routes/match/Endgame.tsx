import {
    Checkbox,
    NumberInput,
    Radio,
    Select, Textarea,
    Title
} from "@mantine/core";
import { FC } from "react";
import { StackValidationChecker } from "../../components/StackValidationChecker";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { DefenseRating, EndgameParkState } from "../../stores/match/matchTypes";
import { useActiveMatchErrors } from "../../stores/match/useActiveMatchErrors";
import { useTeamDB } from "../../stores/thebluealliance/teamDB";

export const Endgame: FC = () => {
    const set = useActiveMatch((state) => state.set);
    const {
        matchNumber,
        endgameParking,
        endgameCoopertitionBonus,
        endgameRobotsDocked,
        endgameLinksCompleted,
        defenseRating,
        diedOnField,
        comments,
    } = useActiveMatch((state) => state);

    const errors = useActiveMatchErrors();

    const teamNumber = useTeamDB((state) => state.getTeamNumber)(matchNumber);

    return (
        <StackValidationChecker>
            <Title align="center">
                Endgame {teamNumber ? `for Team ${teamNumber}` : ""}
            </Title>

            <Radio.Group
                label="Parking"
                my={4}
                onChange={(value) =>
                    set("endgameParking")(value as EndgameParkState)
                }
                value={endgameParking}
                error={errors.endgameParking}
            >
                <Radio
                    value={EndgameParkState().enum.DockEngage}
                    label="Docked + Engaged"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={EndgameParkState().enum.Dock}
                    label="Docked Only"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={EndgameParkState().enum.Park}
                    label="Parked"
                    size="lg"
                    m={4}
                />
                <Radio
                    value={EndgameParkState().enum.None}
                    label="None"
                    size="lg"
                    m={4}
                />
            </Radio.Group>

            <NumberInput
                value={endgameRobotsDocked}
                onChange={(value) => set("endgameRobotsDocked")(value ?? 0)}
                error={errors.endgameRobotsDocked}
                placeholder="Robots Docked"
                label="Robots Docked"
                size="lg"
                my={4}
            />

            <NumberInput
                value={endgameLinksCompleted}
                onChange={(value) => set("endgameLinksCompleted")(value ?? 0)}
                error={errors.endgameLinksCompleted}
                placeholder="Links Completed"
                label="Links Completed"
                size="lg"
                my={4}
            />

            <Checkbox
                label="Coopertition Bonus"
                size="lg"
                my={8}
                checked={endgameCoopertitionBonus}
                onChange={(event) => {
                    set("endgameCoopertitionBonus")(event.target.checked);
                }}
                error={errors.endgameCoopertitionBonus}
            />

            <Select
                label={"Defense Rating"}
                size="lg"
                searchable
                data={DefenseRating().options}
                value={defenseRating}
                onChange={set("defenseRating")}
                my={4}
                error={errors.defenseRating}
            />

            <Checkbox
                label="Died on Field"
                size="lg"
                my={8}
                checked={diedOnField}
                onChange={(event) => {
                    set("diedOnField")(event.target.checked);
                }}
                error={errors.diedOnField}
            />

            <Textarea
                value={comments}
                onChange={(event) => set("comments")(event.target.value)}
                label="Comments"
                size="lg"
                my={4}
                error={errors.comments}
            />
        </StackValidationChecker>
    );
};
