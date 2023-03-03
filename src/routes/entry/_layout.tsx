import { Divider, Stepper } from "@mantine/core";
import { FC, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { routeConfig } from "../../router";
import { TabButtons } from "../../components/TabButtons";

export const EntryLayout: FC = () => {
    const { pathname } = useLocation();

    const active = useMemo(
        () =>
            routeConfig[1].children?.reduce((prev, cur, index) => {
                if (pathname.includes(cur.path)) return index;
                else return prev;
            }, 0),
        [pathname]
    ) ?? 0;

    const previousPath = (active > 0) ? (routeConfig[1].children ?? [])[active - 1].path : undefined;
    const nextPath = (active < ((routeConfig[1].children?.length ?? 0) - 1)) ? (routeConfig[1].children ?? [])[active + 1].path : undefined;

    console.log(active)

    return (
        <div>
            <Stepper active={active - 1} size="sm" iconSize={32} mb={8}>
                <Stepper.Step label="Auto" allowStepSelect={false} />
                <Stepper.Step label="Teleop" allowStepSelect={false} />
                <Stepper.Step label="Endgame" allowStepSelect={false} />
            </Stepper>

            <Divider my="sm" />

            <Outlet />

            <Divider my="sm" />

            <TabButtons previousPath={previousPath} nextPath={nextPath}/>
        </div>
    );
};
