import { useEffect, useState } from "react";

const BASE_URL = "https://api.spotify.com/v1/me/top";

function Home({ accessToken }) {
    const [topArtists, setTopArtists] = useState([]);

    function getTopArtists() {
        const query = new URLSearchParams({
            limit: 25
        });
        return fetch(BASE_URL + "/artists?" + query.toString(), {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to get top artists");
                }
                return res.json();
            })
            .then((json) => {
                const topArtists = [];
                json.items.forEach((artist) => {
                    topArtists.push({
                        id: artist.id,
                        name: artist.name,
                        genres: artist.genres,
                        imageDetails: artist.images[0],
                        popularity: artist.popularity,
                        url: artist.external_urls.spotify,
                        followersCount: artist.followers.total,
                        myTopTracks: []
                    });
                });
                return topArtists;
            })
            .catch((error) => console.error(error.message));
    }

    function mapTracksToArtists(topArtists) {
        const query = new URLSearchParams({
            limit: 30
        });
        return fetch(BASE_URL + "/tracks?" + query.toString(), {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to get top tracks");
                }
                return res.json();
            })
            .then((json) => {
                const myTopArtists = [...topArtists];
                // map top tracks to my top artists
                const tracks = json.items;
                tracks.forEach((current) => {
                    const artistsOfTrack = current.artists;
                    const track = {
                        id: current.id,
                        name: current.name,
                        popularity: current.popularity,
                        previewUrl: current.preview_url,
                        url: current.external_urls.spotify,
                        albumName: current.album.name
                    };
                    const respectiveArtist = myTopArtists.find(
                        (topArtist) =>
                            !!artistsOfTrack.find(
                                (artistOfTrack) =>
                                    artistOfTrack.id === topArtist.id
                            )
                    );
                    if (respectiveArtist) {
                        respectiveArtist.myTopTracks.push(track);
                    }
                });
                return myTopArtists;
            })
            .catch((error) => console.error(error.message));
    }

    useEffect(() => {
        getTopArtists().then((topArtists) => {
            mapTracksToArtists(topArtists).then((updatedTopArtists) => {
                console.log(JSON.stringify(updatedTopArtists, null, "\t"));
            });
        });
    }, []);

    return <div>Welcome to home page</div>;
}

export default Home;

