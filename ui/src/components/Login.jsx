import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const CLIENT_ID = "552221d4641b47f68d756645b7cc32ba";
const REDIRECT_URI = "https://julianschambeck.github.io/spotillage/";

function Login({ setIsAuthorized }) {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        let accessToken = localStorage.getItem("access_token");
        if (code && !accessToken) {
            requestToken(code)
                .then(() => {
                    accessToken = localStorage.getItem("access_token");
                    if (accessToken) {
                        setIsAuthorized(true);
                    }
                })
                .catch(console.log);
        } else if (accessToken) {
            // Token already there
            setIsAuthorized(true);
        }
    }, [setIsAuthorized]);

    return (
        <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3">You are almost there.</Typography>
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "60%",
                }}
            >
                <Typography>
                    First you need to login to Spotify. This is so that Spotillage can list your
                    favorite artists. Spotillage does not store any of your Spotify data.
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 5, width: "34%" }}
                    onClick={() => requestCode().catch(console.log)}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;

/* Second step to authorize app */
async function requestToken(code) {
    // ready to request access token
    const codeVerifier = localStorage.getItem("code_verifier");
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
    });
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
    });
    if (!response.ok) {
        console.log("error getting access token");
        throw new Error("HTTP status " + response.status);
    }
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
}

/* First step to authorize app */
async function requestCode() {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);
    const scope = "user-top-read";
    localStorage.setItem("code_verifier", codeVerifier);

    const args = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
    });
    window.location = "https://accounts.spotify.com/authorize?" + args;
}

/* HELPERS */

function generateRandomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return base64encode(digest);
}
