import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Popover from "@mui/material/Popover";

import { fetchTopArtists, fetchTopTracks } from "../queries";
import ArtistDetails from "./ArtistDetails";

function Home({ token }) {
    const [isLoading, setIsLoading] = useState(false);
    const [artists, setArtists] = useState([]);

    const [focusedArtist, setFocusedArtist] = useState(null);
    const [rank, setRank] = useState(-1);
    const [anchorElement, setAnchorElement] = useState(null);

    const handleClick = (event, artist, rank) => {
        setAnchorElement(event.currentTarget);
        setFocusedArtist(artist);
        setRank(rank);
    };

    const handleClose = () => {
        setAnchorElement(null);
        setFocusedArtist(null);
        setRank(-1);
    };

    const isOpen = Boolean(anchorElement);

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
                    <Popover
                        id="artist-details"
                        open={isOpen}
                        anchorEl={anchorElement}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <div>
                            {!!focusedArtist && <ArtistDetails artist={focusedArtist} rank={rank} />}
                        </div>
                    </Popover>
                    <ImageList cols={5} gap={4}>
                        {artists.map((artist, index) => {
                            // use image with highest resolution
                            const { url, width, height } = artist.images[0];
                            return (
                                <ImageListItem
                                    onClick={(event) => handleClick(event, artist, index + 1)}
                                    key={artist.id}
                                >
                                    <img
                                        src={`${url}?w=${width}&h=${height}&fit=crop&auto=format`}
                                        loading="lazy"
                                        alt="specific artist"
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

/* Assign tracks to respective artists */
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
