import { Button, Group } from "@mantine/core";
import { Children, FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type TabButtonsParams = {
    nextPath?: string;
    previousPath?: string;
};

export const TabButtons: FC<PropsWithChildren<TabButtonsParams>> = ({
    nextPath,
    previousPath,
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
                <Link to={nextPath ?? ""} style={{ all: "unset" }}>
                    <Button mx={4}>Next</Button>
                </Link>
            ) : (
                <></>
            )}
        </Group>
    );
};
