import {
    ActionIcon,
    Badge,
    Box,
    Flex,
    Group,
    Paper,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useTeamDB } from "./stores/thebluealliance/teamDB";
import { useIsMobile } from "./util/useIsMobile";

const App: FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isMobile = useIsMobile();
    const dark = colorScheme === "dark";
    const side = useTeamDB((state) => state.teamPosition);

    return (
        <Box
            sx={(theme) => ({
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: dark
                    ? theme.colors.dark[8]
                    : theme.colors.gray[2],
            })}
        >
            <Paper
                shadow={"md"}
                h={60}
                sx={(theme) => ({
                    backgroundColor: dark ? theme.colors.dark[7] : "white",
                })}
            >
                <Flex
                    align={"center"}
                    h={"100%"}
                    justify={"space-between"}
                    px={"md"}
                >
                    <Group align={"center"}>
                        <a
                            href="/"
                            style={{
                                all: "inherit",
                            }}
                        >
                            <Title>
                                {isMobile
                                    ? "3494 Scouting"
                                    : "3494 Scouting App"}
                            </Title>
                        </a>
                        <a
                            href="/#/database/tba"
                            style={{
                                all: "inherit",
                            }}
                        >
                            <Badge
                                color={side.includes("Red") ? "red" : "blue"}
                            >
                                {side}
                            </Badge>
                        </a>
                    </Group>
                    <ActionIcon
                        variant="outline"
                        color={dark ? "yellow" : "blue"}
                        onClick={() => toggleColorScheme()}
                        title="Toggle color scheme"
                        size={"xl"}
                    >
                        {dark ? (
                            <IconSun size="1.7rem" />
                        ) : (
                            <IconMoonStars size="1.7rem" />
                        )}
                    </ActionIcon>
                </Flex>
            </Paper>
            <Box
                sx={() => ({
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                })}
            >
                <Paper
                    my={"md"}
                    p={"lg"}
                    shadow={"lg"}
                    style={{
                        gridColumnStart: 2,
                    }}
                >
                    <RouterProvider router={router} />
                </Paper>
            </Box>
        </Box>
    );
};

export default App;
