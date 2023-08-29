import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyles } from "@/styles";
import DarkModeProvider from "./context/DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("I-Am-Root") as HTMLElement).render(
    <React.StrictMode>
        <GlobalStyles />
        <DarkModeProvider>
            <App />
        </DarkModeProvider>
    </React.StrictMode>
);
