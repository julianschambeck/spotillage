import { useState } from "react";

import Home from  "./components/Home.jsx";

function App() {
    const initialState = {
        isLoggedIn: false,
        accessToken: "",
        refreshToken: ""
    };
    const [userState, setUserState] = useState(initialState);
    function storeToken() {
        const url = new URL(
            window.location.origin + window.location.pathname.replace("/", "?")
        );
        const params = new URLSearchParams(url.search);
         setUserState({
            isLoggedIn: params.has("access_token"),
            accessToken: params.get("access_token"),
            refreshToken: params.get("refresh_token")
        });
    }
    return (
        <>
            {userState.isLoggedIn ? (
                <Home accessToken={userState.accessToken}/>
            ) : (
                // Login Screen
                <div>
                    <p>
                        Press <a href="http://localhost:8888/login">here</a> to
                        login to Spotify and authorize access to relevant
                        Spotify data
                    </p>
                    <div>
                        <button onClick={storeToken}>Store token</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
