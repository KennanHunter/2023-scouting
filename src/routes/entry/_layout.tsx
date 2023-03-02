import { Stepper, Divider } from "@mantine/core";
import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { routeConfig } from "../../router";

export const EntryLayout: FC = () => {
    return (
        <div>
            <Stepper active={0} size="sm" iconSize={32} mb={8}>
                <Stepper.Step
                    label="Auto"
                    allowStepSelect={false}
                />
                <Stepper.Step
                    label="Teleop"
                    allowStepSelect={false}
                />
                <Stepper.Step
                    label="Endgame"
                    allowStepSelect={false}
                />
            </Stepper>
            <Divider my="sm" />

            <Outlet />
        </div>
    );
};
