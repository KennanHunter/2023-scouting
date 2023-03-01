import { createHashRouter } from "react-router-dom";
import { Home } from "./routes/Home";
import { Meta } from "./routes/Meta";
import { Start } from "./routes/Start";

export const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    { path: "/meta", element: <Meta /> },
    {
        path: "/start",
        element: <Start />,
    },
]);
