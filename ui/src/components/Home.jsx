import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
                <Container>
                    <h1 style={{ textAlign: "center" }}>Spotillage</h1>
                    <h3 style={{ marginBottom: 40, textAlign: "center" }}>
                        a collage of your favorite artists on Spotify
                    </h3>
                    <ImageList cols={5} gap={6}>
                        {artists.map((a) => {
                            // choose image with highest resolution
                            const { url, width, height } = a.images[0];
                            return (
                                <ImageListItem key={a.id}>
                                    <img
                                        src={`${url}?w=${width}&h=${height}&fit=crop&auto=format`}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            );
                        })}
                    </ImageList>
                </Container>
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
