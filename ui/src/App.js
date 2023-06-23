"use client";

import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ErrorBoundary } from "react-error-boundary";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import FallbackOnError from "./components/FallbackOnError.jsx"

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
    const [userState, setUserState] = useState({
        auth: false,
        accessToken: "",
        refreshToken: "",
    });

    useEffect(() => {
        // GET AND STORE ACCESS TOKEN
        let url = window.location.origin + window.location.pathname.replace("/", "?");
        if (url.includes("access_token") && !userState.auth) {
            url = new URL(url);
            const params = new URLSearchParams(url.search);
            setUserState({
                auth: params.has("access_token"),
                accessToken: params.get("access_token"),
                refreshToken: params.get("refresh_token"),
            });
        }
    }, [userState]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <ErrorBoundary fallback={<FallbackOnError />}>
                {userState.auth ? <Home token={userState.accessToken} /> : <Login />}
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
