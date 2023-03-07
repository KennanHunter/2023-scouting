import { Button, Group } from "@mantine/core";
import { FC, PropsWithChildren, useMemo } from "react";
import { Link } from "react-router-dom";

type TabButtonsParams = {
    nextPath?: string;
    previousPath?: string;
    enableNext?: boolean;
};

export const TabButtons: FC<PropsWithChildren<TabButtonsParams>> = ({
    nextPath,
    previousPath,
    enableNext,
    children,
}) => {
    return (
        <Group position="center" grow>
            {previousPath ? (
                <Link to={previousPath ?? ""} style={{ all: "unset" }}>
                    <Button mx={4}>Previous</Button>
                </Link>
            ) : (
                <></>
            )}
            {children}
            {nextPath ? (
                <Link to={enableNext ? (nextPath ?? "") : "."} relative={enableNext ? undefined : "path"} style={{ all: "unset" }}>
                    <Button mx={4} disabled={!enableNext}>
                        Next
                    </Button>
                </Link>
            ) : (
                <></>
            )}
        </Group>
    );
};
