"use client";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ErrorBoundary } from "react-error-boundary";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import FallbackOnError from "./components/FallbackOnError.jsx";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#57996d",
            dark: "#448358",
            light: "#78AD8A",
        },
    },
});

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <ErrorBoundary fallback={<FallbackOnError />}>
                {!isAuthorized ? <Login setIsAuthorized={setIsAuthorized} /> : <Home />}
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
