import { FC } from "react";
import { Outlet } from "react-router-dom";

export const DatabaseLayout: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};
