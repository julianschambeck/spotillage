import { useEffect, useState } from "react";

import { Tile } from "./Tile.jsx";

const BASE_URL = "https://api.spotify.com/v1/me/top";

function Home({ accessToken }) {
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

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
                const favoriteArtists = [];
                json.items.forEach((artist) => {
                    favoriteArtists.push({
                        id: artist.id,
                        name: artist.name,
                        genres: artist.genres,
                        imageDetails: artist.images[2],
                        popularity: artist.popularity,
                        url: artist.external_urls.spotify,
                        followersCount: artist.followers.total,
                        myFavoriteTracks: []
                    });
                });
                return favoriteArtists;
            })
            .catch((error) => console.error(error.message));
    }

    function mapTracksToArtists(artists) {
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
                const favoriteArtists = [...artists];
                // map my favorite tracks to my favorite artists
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
                    const associatedArtist = favoriteArtists.find(
                        (favoriteArtist) =>
                            !!artistsOfTrack.find(
                                (artist) => artist.id === favoriteArtist.id
                            )
                    );
                    if (associatedArtist) {
                        // the track is from one of my favorite artists
                        associatedArtist.myFavoriteTracks.push(track);
                    }
                });
                return favoriteArtists;
            })
            .catch((error) => console.error(error.message));
    }

    useEffect(() => {
        getTopArtists().then((artists) => {
            mapTracksToArtists(artists).then((artists) => {
                // console.log(JSON.stringify(artists, null, "\t"));
                setFavoriteArtists(artists);
                setIsLoading(false);
            });
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Still loading, just a sec</div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    {favoriteArtists.slice(0, 4).map((current, index) => {
                        return <Tile artist={current} key={index}/>;
                    })}
                </div>
            )}
        </>
    );
}

export default Home;
