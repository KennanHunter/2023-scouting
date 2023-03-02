import { createHashRouter, RouteObject } from "react-router-dom";
import { Meta } from "./routes/entry/Meta";
import { Save } from "./routes/entry/Save";
import { Start } from "./routes/entry/Start";
import { EntryLayout } from "./routes/entry/_layout";
import { Home } from "./routes/Home";

export const routeConfig: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/entry/",
        element: <EntryLayout />,
        children: [
            { path: "meta", element: <Meta /> },
            {
                path: "start",
                element: <Start />,
            },
            { path: "save", element: <Save /> },
        ],
    },
];
export const router = createHashRouter(routeConfig);
