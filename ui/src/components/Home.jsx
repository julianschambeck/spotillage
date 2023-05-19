import { useEffect, useState } from "react";

import { Tile } from "./Tile.jsx";
import { fetchTopArtists, fetchTopTracks } from "../queries/";

function Home({ token }) {
    const [isLoading, setIsLoading] = useState(false);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        // load all necessary data at once
        const loadData = async () => {
            setIsLoading(true);
            let response = await fetchTopArtists(token);
            let artists = [];
            let tracks = [];
            if (response.ok) {
                artists = (await response.json()).items;
                artists.forEach((a) => {
                    a.tracks = [];
                });
            }
            response = await fetchTopTracks(token);
            if (response.ok) {
                tracks = (await response.json()).items;
                artists = distributeTracks(tracks, artists);
                console.log(artists);
                setArtists(artists);
            }
            setIsLoading(false);
        };
        loadData().catch(console.error);
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Still loading, just a sec</div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        backgroundColor: "#ff00ff",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                    }}
                >
                    {artists.slice(0, 4).map((current, index) => {
                        return <Tile artist={current} key={index} />;
                    })}
                </div>
            )}
        </>
    );
}

export default Home;

/* assign tracks to respective artists */
function distributeTracks(tracks, artists) {
    const resultArtists = [...artists];
    resultArtists.forEach((artist) => {
        for (const track of tracks) {
            const hasArtist = !!track.artists.find((a) => {
                return a.id == artist.id;
            });
            if (hasArtist) {
                artist.tracks.push(track);
            }
        }
    });
    return resultArtists;
}
