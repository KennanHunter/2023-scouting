import { createHashRouter, RouteObject } from "react-router-dom";
import { Meta as MatchMeta } from "./routes/match/Meta";

import { CreateQR } from "./routes/database/CreateQR";
import { ViewData } from "./routes/database/ViewData";
import { DatabaseLayout } from "./routes/database/_layout";
import { Home } from "./routes/Home";
import { Auto as MatchAuto } from "./routes/match/Auto";
import { Endgame } from "./routes/match/Endgame";
import { Save as MatchSave } from "./routes/match/Save";
import { Teleop as MatchTeleop } from "./routes/match/Teleop";
import { MatchLayout } from "./routes/match/_layout";
import { Meta as PitAuto } from "./routes/pit/Auto";
import { Meta as PitMeta } from "./routes/pit/Meta";
import { Robot } from "./routes/pit/Robot";
import { Save as PitSave } from "./routes/pit/Save";
import { Meta as PitTeleop } from "./routes/pit/Teleop";
import { PitLayout } from "./routes/pit/_layout";

export const routeConfig = [
    {
        path: "/",
        element: <Home />,
    } as const,
    {
        path: "/match/",
        element: <MatchLayout />,
        children: [
            { path: "meta", element: <MatchMeta /> },
            {
                path: "auto",
                element: <MatchAuto />,
            },
            {
                path: "teleop",
                element: <MatchTeleop />,
            },
            {
                path: "endgame",
                element: <Endgame />,
            },
            { path: "save", element: <MatchSave /> },
        ],
    },
    {
        path: "/pit/",
        element: <PitLayout />,
        children: [
            { path: "meta", element: <PitMeta /> },
            { path: "robot", element: <Robot /> },
            { path: "auto", element: <PitAuto /> },
            { path: "teleop", element: <PitTeleop /> },
            { path: "save", element: <PitSave /> },
        ],
    },
    {
        path: "/database/",
        element: <DatabaseLayout />,
        children: [
            { path: "viewdata", element: <ViewData /> },
            {
                path: "create/",
                children: [{ path: "qr", element: <CreateQR /> }],
            },
        ],
    },
] satisfies RouteObject[];

export const router = createHashRouter(routeConfig);
