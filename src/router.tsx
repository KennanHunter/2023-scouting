import { createHashRouter, RouteObject } from "react-router-dom";
import { Meta } from "./routes/match/Meta";
import { Save } from "./routes/match/Save";
import { Auto } from "./routes/match/Auto";
import { Teleop } from "./routes/match/Teleop";
import { Endgame } from "./routes/match/Endgame";
import { MatchLayout } from "./routes/match/_layout";
import { Home } from "./routes/Home";
import { ViewData } from "./routes/database/ViewData";
import { DatabaseLayout } from "./routes/database/_layout";
import { PitLayout } from "./routes/pit/_layout";
import { Robot } from "./routes/pit/Robot";

export const routeConfig = [
    {
        path: "/",
        element: <Home />,
    } as const,
    {
        path: "/match/",
        element: <MatchLayout />,
        children: [
            { path: "meta", element: <Meta /> },
            {
                path: "auto",
                element: <Auto />,
            },
            {
                path: "teleop",
                element: <Teleop />,
            },
            {
                path: "endgame",
                element: <Endgame />,
            },
            { path: "save", element: <Save /> },
        ],
    },
    {
        path: "/pit/",
        element: <PitLayout />,
        children: [
            { path: "meta", element: <Meta /> },
            { path: "robot", element: <Robot /> },
        ],
    },

    {
        path: "/database/",
        element: <DatabaseLayout />,
        children: [{ path: "viewdata", element: <ViewData /> }],
    },
] satisfies RouteObject[];
export const router = createHashRouter(routeConfig);
