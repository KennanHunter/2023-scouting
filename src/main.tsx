import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineWrapper } from "./components/MantineWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineWrapper>
            <App />
        </MantineWrapper>
    </React.StrictMode>
);
