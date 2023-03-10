import {
    Button,
    Checkbox,
    Group,
    NumberInput,
    Radio,
    Select,
    Tabs,
    Text,
    Textarea,
    Title,
} from "@mantine/core";
import { FC, PropsWithChildren, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    AutoParkState,
    DefenseRating,
    EndgameParkState,
    MatchState,
} from "../../stores/match/matchTypes";
import { FieldInput } from "../../components/FieldInput";
import { GridInput } from "../../components/GridInput";

type MatchDataViewParams = {
    match: MatchState;
};

export const MatchDataView: FC<MatchDataViewParams> = ({ match }) => {
    return (
        <>
            <Tabs.Panel value="auto" pt="xs">
                <Text size="lg">Starting Position</Text>
                <FieldInput
                    onChange={(data) => {}}
                    singlePoint
                    readonly
                    data={[match.autonomousStartingLocation]}
                />
                <Checkbox
                    label="Left Community Zone"
                    size="lg"
                    my={8}
                    checked={match.autonomousLeftCommunityZone}
                />
                <Text size="lg">Grid</Text>
                <GridInput
                    onChange={(data) => {}}
                    data={match.autonomousGridData}
                    readonly
                />

                <Radio.Group
                    label="Parking"
                    my={4}
                    value={match.autonomousParking}
                >
                    <Radio
                        value={AutoParkState().enum.DockEngage}
                        label="Docked + Engaged"
                        size="lg"
                        m={4}
                    />
                    <Radio
                        value={AutoParkState().enum.Dock}
                        label="Docked Only"
                        size="lg"
                        m={4}
                    />
                    <Radio
                        value={AutoParkState().enum.None}
                        label="None"
                        size="lg"
                        m={4}
                    />
                </Radio.Group>
            </Tabs.Panel>

            <Tabs.Panel value="teleop" pt="xs">
                <NumberInput
                    value={match.teleopGroundPickups}
                    placeholder="Ground Pickups"
                    label="Ground Pickups"
                    size="lg"
                    my={4}
                />

                <NumberInput
                    value={match.teleopSubstation1Pickups}
                    placeholder="Substation 1 Pickups"
                    label="Substation 1 Pickups"
                    size="lg"
                    my={4}
                />

                <NumberInput
                    value={match.teleopSubstation2LowPickups}
                    placeholder="Substation 2 Low Pickups"
                    label="Substation 2 Low Pickups"
                    size="lg"
                    my={4}
                />

                <NumberInput
                    value={match.teleopSubstation2HighPickups}
                    placeholder="Substation 2 High Pickups"
                    label="Substation 2 High Pickups"
                    size="lg"
                    my={4}
                />

                <Checkbox
                    label="Scavenger/Runner Robot"
                    size="lg"
                    my={8}
                    checked={match.teleopRunnerRobot}
                />

                <Text size="lg">Grid</Text>
                <GridInput
                    onChange={(data) => {}}
                    data={match.teleopGridData}
                    readonly
                />
            </Tabs.Panel>

            <Tabs.Panel value="endgame" pt="xs">
                <Radio.Group
                    label="Parking"
                    my={4}
                    value={match.endgameParking}
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
                    value={match.endgameRobotsDocked}
                    placeholder="Robots Docked"
                    label="Robots Docked"
                    size="lg"
                    my={4}
                />

                <NumberInput
                    value={match.endgameLinksCompleted}
                    placeholder="Links Completed"
                    label="Links Completed"
                    size="lg"
                    my={4}
                />

                <Checkbox
                    label="Coopertition Bonus"
                    size="lg"
                    my={8}
                    checked={match.endgameCoopertitionBonus}
                />

                <Select
                    label={"Defense Rating"}
                    size="lg"
                    searchable
                    data={DefenseRating().options}
                    value={match.defenseRating}
                    my={4}
                />

                <Checkbox
                    label="Died on Field"
                    size="lg"
                    my={8}
                    checked={match.diedOnField}
                />

                <Textarea
                    value={match.comments}
                    label="Comments"
                    size="lg"
                    my={4}
                />
            </Tabs.Panel>
        </>
    );
};
