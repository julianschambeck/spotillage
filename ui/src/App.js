import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./components/Home.jsx";

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
            {userState.auth ? (
                <Home token={userState.accessToken} />
            ) : (
                // Login screen
                <div>
                    <p>
                        You need to login to Spotify first{" "}
                        <a href="http://localhost:8888/login">here</a>
                    </p>
                </div>
            )}
        </ThemeProvider>
    );
}

export default App;
