import { useEffect, useState } from "react";

import ArtistTile from "./ArtistTile.jsx";
import { fetchTopArtists, fetchTopTracks } from "../queries";

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
                console.log("artists", artists);
                setArtists(artists);
            }
            setIsLoading(false);
        };
        loadData().catch(console.error);
    }, [token]);

    return (
        <>
            {isLoading ? (
                <div>Still loading, just a sec</div>
            ) : (
                <div id="home">
                    {artists.map((a) => {
                        return <ArtistTile artist={a} key={a.id} />;
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
                return a.id === artist.id;
            });
            if (hasArtist) {
                artist.tracks.push(track);
            }
        }
    });
    return resultArtists;
}
