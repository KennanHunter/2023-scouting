import { Box, Flex, Paper, Title } from "@mantine/core";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App: FC = () => {
    return (
        <Box
            sx={(theme) => ({
                width: "100vw",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[2],
            })}
        >
            <Box h={60} bg={"white"}>
                <Flex align={"center"} h={"100%"} px={"sm"}>
                    <Title>3494 Scouting App</Title>
                </Flex>
            </Box>
            <Box
                sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: "auto min(700px, 90vw) auto",
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
