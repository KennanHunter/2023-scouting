import { Box, Flex, Header, Paper, Title } from "@mantine/core";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App: FC = () => {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
            }}
        >
            <Header height={60}>
                <Flex align={"center"} h={"100%"} px={"sm"}>
                    <Title>3494 Scouting App</Title>
                </Flex>
            </Header>
            <Box
                sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: "auto min(700px, 90vw) auto",
                    height: "100%",
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[2],
                })}
            >
                <Paper
                    m={"md"}
                    p={"lg"}
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
