import { Divider, Stepper } from "@mantine/core";
import { FC, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TabButtons } from "../../components/TabButtons";
import { routeConfig } from "../../router";

export const EntryLayout: FC = () => {
    const { pathname } = useLocation();

    const active =
        useMemo(
            () =>
                routeConfig[1].children?.reduce((prev, cur, index) => {
                    if (pathname.includes(cur.path)) return index;
                    else return prev;
                }, 0),
            [pathname]
        ) ?? 0;

    const [previousPath, nextPath] = (() => {
        let returnValue: [string | undefined, string | undefined] = [
            undefined,
            undefined,
        ];

        const { children } = routeConfig[1];
        if (!children) return returnValue;

        if (active > 0) returnValue[0] = children[active - 1].path;

        if (active < children.length - 1)
            returnValue[1] = children[active + 1].path;

        return returnValue;
    })();

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

            <TabButtons previousPath={previousPath} nextPath={nextPath} />
        </div>
    );
};
