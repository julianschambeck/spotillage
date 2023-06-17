import { Fragment, useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./components/Home.jsx";

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
        <>
            <CssBaseline enableColorScheme />
            {userState.auth ? (
                <Home token={userState.accessToken} />
            ) : (
                // login screen
                <div>
                    <p>
                        You need to login to Spotify first{" "}
                        <a href="http://localhost:8888/login">here</a>
                    </p>
                </div>
            )}
        </>
    );
}

export default App;
