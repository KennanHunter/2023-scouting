import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { FC, PropsWithChildren } from "react";
import { useTeamDB } from "../stores/thebluealliance/teamDB";

export const MantineWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    const primaryColor = useTeamDB(
        (state) => state.teamPosition.split(" ")[0] as "Red" | "Blue"
    );

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{
                    colorScheme,
                    breakpoints: {
                        xs: 500,
                        sm: 800,
                        md: 1000,
                        lg: 1200,
                        xl: 1400,
                    },
                    primaryColor: "blue", // primaryColor.toLowerCase(),
                }}
                withGlobalStyles
                withNormalizeCSS
            >
                <NotificationsProvider>
                    <ModalsProvider
                        modalProps={{
                            size: "xl",
                        }}
                    >
                        {children}
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};
