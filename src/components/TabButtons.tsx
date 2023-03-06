import { Button, Group } from "@mantine/core";
import { Children, FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type TabButtonsParams = {
    nextPath?: string;
    previousPath?: string;
    enableNext?: boolean;
    enablePrevious?: boolean;
};

export const TabButtons: FC<PropsWithChildren<TabButtonsParams>> = ({
    nextPath,
    previousPath,
    enableNext,
    enablePrevious,
    children,
}) => {
    return (
        <Group position="center" grow>
            {previousPath ? (
                <Link to={previousPath ?? ""} style={{ all: "unset" }}>
                    <Button mx={4} data-disabled={enablePrevious}>
                        Previous
                    </Button>
                </Link>
            ) : (
                <></>
            )}
            {children}
            {nextPath ? (
                <Link to={nextPath ?? ""} style={{ all: "unset" }}>
                    <Button mx={4} data-disabled={enableNext}>
                        Next
                    </Button>
                </Link>
            ) : (
                <></>
            )}
        </Group>
    );
};
