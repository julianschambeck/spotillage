/* QUERIES TO FETCH DATA */

const BASE_URL = "https://api.spotify.com/v1/me/top";

function getHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    };
}

function fetchTopArtists(token) {
    const query = new URLSearchParams({
        limit: 25,
    });
    const headers = getHeaders(token);
    return fetch(BASE_URL + "/artists?" + query.toString(), {
        headers: headers,
    });
}

function fetchTopTracks(token) {
    const query = new URLSearchParams({
        limit: 30,
    });
    const headers = getHeaders(token);
    return fetch(BASE_URL + "/tracks?" + query.toString(), {
        headers: headers,
    });
}

export { fetchTopArtists, fetchTopTracks };
