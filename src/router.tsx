import { createHashRouter, RouteObject } from "react-router-dom";
import { Meta } from "./routes/entry/Meta";
import { Save } from "./routes/entry/Save";
import { Auto } from "./routes/entry/Auto";
import { Teleop } from "./routes/entry/Teleop";
import { Endgame } from "./routes/entry/Endgame";
import { EntryLayout } from "./routes/entry/_layout";
import { Home } from "./routes/Home";
import { ViewData } from "./routes/database/ViewData";
import { DatabaseLayout } from "./routes/database/_layout";

export const routeConfig = [
    {
        path: "/",
        element: <Home />,
    } as const,
    {
        path: "/entry/",
        element: <EntryLayout />,
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
        path: "/database/",
        element: <DatabaseLayout />,
        children: [
            { path: "viewdata", element: <ViewData /> },
        ],
    },
] satisfies RouteObject[];
export const router = createHashRouter(routeConfig);
