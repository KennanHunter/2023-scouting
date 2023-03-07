import { Button, Divider, Stepper, Tooltip } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { FC, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TabButtons } from "../../components/TabButtons";
import { routeConfig } from "../../router";
import { useActiveMatch } from "../../stores/match/activeMatch";
import { useValidationState } from "../../stores/validation/validationStore";

export const MatchLayout: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const clearActiveMatch = useActiveMatch((state) => state.clear);

    const active =
        useMemo(
            () =>
                routeConfig[1].children?.reduce((prev, cur, index) => {
                    if (pathname.includes(cur.path)) return index;
                    else return prev;
                }, 0),
            [pathname]
        ) ?? 0;

    const [previousPath, nextPath] = useMemo(() => {
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
    }, [routeConfig, active]);

    const childValidated = useValidationState().valid;

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

            <TabButtons
                previousPath={previousPath}
                nextPath={nextPath}
                enableNext={childValidated}
            >
                <Tooltip label={"Clear all data and Quit"}>
                    <Button
                        leftIcon={<IconTrash />}
                        onClick={() => {
                            openConfirmModal({
                                title: "Confirm",
                                children: "This action will delete all data",
                                labels: {
                                    confirm: "Confirm",
                                    cancel: "Cancel",
                                },
                                confirmProps: { color: "red" },

                                onConfirm: () => {
                                    clearActiveMatch();
                                    navigate("/");
                                },
                            });
                        }}
                    >
                        Clear
                    </Button>
                </Tooltip>
            </TabButtons>
        </div>
    );
};
