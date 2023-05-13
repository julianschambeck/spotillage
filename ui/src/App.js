import { useState, useEffect } from "react";

import Home from "./components/Home.jsx";

function App() {
    const [userState, setUserState] = useState({
        auth: false,
        accessToken: "",
        refreshToken: ""
    });

    useEffect(() => {
        let url =
            window.location.origin + window.location.pathname.replace("/", "?");
        if (url.includes("access_token") && !userState.auth) {
            url = new URL(url);
            const params = new URLSearchParams(url.search);
            setUserState({
                auth: params.has("access_token"),
                accessToken: params.get("access_token"),
                refreshToken: params.get("refresh_token")
            });
        }
    }, []);

    return (
        <>
            {userState.auth ? (
                <Home authToken={userState.accessToken} />
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
