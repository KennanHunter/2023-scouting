import { Checkbox, NumberInput, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { useActivePit } from "../../stores/pit/activePit";

export const Robot: FC = () => {
    const set = useActivePit((state) => state.set);
    const {
        robotHeight,
        robotLength,
        robotWidth,
        robotWeight,
        robotCanPickupFloor,
        robotCanPickupRamp,
        robotCanPickupShelf,
        robotCanEngageAuto,
        robotCanDockAuto,
        robotCanEngageTeleop,
        robotCanDockTeleop,
        robotCanPlaceCone,
        robotCanPlaceCube,
        autonomousCanExitCommunity,
        autonomousGridPlaceTop,
        autonomousGridPlaceMiddle,
        autonomousGridPlaceBottom,
        autonomousNumberOfPrograms,
        teleopGridPlaceTop,
        teleopGridPlaceMiddle,
        teleopGridPlaceBottom,
        teleopPlaysDefense,
        teleopRunnerRobot,

    } = useActivePit((state) => state);

    return (
        <Stack>
            <Title align="center">Pit</Title>

            <NumberInput
                value={robotWeight}
                onChange={(value) => set("robotWeight")(value ?? 0)}
                error={
                    robotWeight < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Weight"
                label="Weight"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotHeight}
                onChange={(value) => set("robotHeight")(value ?? 0)}
                error={
                    robotHeight < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Height"
                label="Height"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotLength}
                onChange={(value) => set("robotLength")(value ?? 0)}
                error={
                    robotLength < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Substation 2 Low Pickups"
                label="Substation 2 Low Pickups"
                size="lg"
                my={4}
            />

            <NumberInput
                value={robotWidth}
                onChange={(value) => set("robotWeight")(value ?? 0)}
                error={
                    robotWidth < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Width"
                label="Width"
                size="lg"
                my={4}
            />
            <Checkbox
                label="Pickup from Ramp"
                size="lg"
                my={8}
                checked={robotCanPickupRamp}
                onChange={(event) => {
                    set("robotCanPickupRamp")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Shelf"
                size="lg"
                my={8}
                checked={robotCanPickupShelf}
                onChange={(event) => {
                    set("robotCanPickupShelf")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Floor"
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
            <Checkbox
                label="Place to "
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Floor"
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
            <Checkbox
                label="Pickup from Floor"
                size="lg"
                my={8}
                checked={robotCanPickupFloor}
                onChange={(event) => {
                    set("robotCanPickupFloor")(event.target.checked);
                }}
            />
            <Checkbox
                label="robotCanDockAuto"
                size="lg"
                my={8}
                checked={robotCanDockAuto}
                onChange={(event) => {
                    set("robotCanDockAuto")(event.target.checked);
                }}
            />
            <Checkbox
                label="robotCanEngageAuto"
                size="lg"
                my={8}
                checked={robotCanEngageAuto}
                onChange={(event) => {
                    set("robotCanEngageAuto")(event.target.checked);
                }}
            />
            <Checkbox
                label="Robot Engages in Teleop"
                size="lg"
                my={8}
                checked={robotCanEngageTeleop}
                onChange={(event) => {
                    set("robotCanEngageTeleop")(event.target.checked);
                }}
            />
            <Checkbox
                label="Robot Docks in Teleop"
                size="lg"
                my={8}
                checked={robotCanDockTeleop}
                onChange={(event) => {
                    set("robotCanDockTeleop")(event.target.checked);
                }}
            />
            <Checkbox
                label="Can Control Cones"
                size="lg"
                my={8}
                checked={robotCanPlaceCone}
                onChange={(event) => {
                    set("robotCanPlaceCube")(event.target.checked);
                }}
            />
            <Checkbox
                label="Can Control Cubes"
                size="lg"
                my={8}
                checked={robotCanPlaceCube}
                onChange={(event) => {
                    set("robotCanPlaceCube")(event.target.checked);
                }}
            />
            
            <Checkbox
                label="Exists Community in Auto"
                size="lg"
                my={8}
                checked={autonomousCanExitCommunity}
                onChange={(event) => {
                    set("autonomousCanExitCommunity")(event.target.checked);
                }}
            />
            <NumberInput
                value={autonomousGridPlaceBottom}
                onChange={(value) => set("autonomousGridPlaceBottom")(value ?? 0)}
                error={
                    autonomousGridPlaceBottom < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Bottom Auto Placements"
                label="Placements on Bottom in Auto"
                size="lg"
                my={4}
            />
            <NumberInput
                value={autonomousGridPlaceMiddle}
                onChange={(value) => set("autonomousGridPlaceBottom")(value ?? 0)}
                error={
                    autonomousGridPlaceMiddle < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Middle Auto Placements"
                label="Placements on Middle in Auto"
                size="lg"
                my={4}
            />
            <NumberInput
                value={autonomousGridPlaceTop}
                onChange={(value) => set("autonomousGridPlaceTop")(value ?? 0)}
                error={
                    autonomousGridPlaceTop < 0 ? "Value cannot be less than 0!" : undefined
                }
                placeholder="Top Auto Placements"
                label="Placements on Top in Auto"
                size="lg"
                my={4}
            />
            <Checkbox
                label="Places on the Top of the grid in Teleop"
                size="lg"
                my={8}
                checked={teleopGridPlaceTop}
                onChange={(event) => {
                    set("teleopGridPlaceTop")(event.target.checked);
                }}
            />   
            <Checkbox
                label="Places on the Middle of the grid in Teleop"
                size="lg"
                my={8}
                checked={teleopGridPlaceMiddle}
                onChange={(event) => {
                    set("teleopGridPlaceMiddle")(event.target.checked);
                }}
            />  
            <Checkbox
                label="Places on the Bottom of the grid in Teleop"
                size="lg"
                my={8}
                checked={teleopGridPlaceBottom}
                onChange={(event) => {
                    set("teleopGridPlaceBottom")(event.target.checked);
                }}
            />   
            <Checkbox
                label="Plays Defense in Teleop"
                size="lg"
                my={8}
                checked={teleopPlaysDefense}
                onChange={(event) => {
                    set("teleopPlaysDefense")(event.target.checked);
                }}
            />  
            <Checkbox
                label="Runs Cycles in Teleop"
                size="lg"
                my={8}
                checked={teleopRunnerRobot}
                onChange={(event) => {
                    set("teleopRunnerRobot")(event.target.checked);
                }}
            />                              
        </Stack>
    );
};
