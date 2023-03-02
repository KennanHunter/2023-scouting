import { Divider, Stepper } from "@mantine/core";
import { FC, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { routeConfig } from "../../router";

export const EntryLayout: FC = () => {
    const { pathname } = useLocation();

    const active = useMemo(
        () =>
            routeConfig[1].children?.reduce((prev, cur, index) => {
                if (pathname.includes(cur.path)) return index;
                else return prev;
            }, 0),
        [pathname]
    );

    return (
        <div>
            <Stepper active={(active ?? 0) - 1} size="sm" iconSize={32} mb={8}>
                <Stepper.Step label="Auto" allowStepSelect={false} />
                <Stepper.Step label="Teleop" allowStepSelect={false} />
                <Stepper.Step label="Endgame" allowStepSelect={false} />
            </Stepper>
            <Divider my="sm" />

            <Outlet />
        </div>
    );
};
