import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { fetchTopArtists, fetchTopTracks } from "../queries";
import ArtistDetails from "./ArtistDetails";

function Home() {
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
            const token = localStorage.getItem("access_token");
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
    }, []);

    return (
        <>
            {isLoading ? (
                <Container
                    sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <Typography variant="h6">
                        Loading your favorite artists, just a moment...
                    </Typography>
                    <Box sx={{ mt: 2, width: "60%" }}>
                        <LinearProgress />
                    </Box>
                </Container>
            ) : (
                <Container>
                    <Typography variant="h3" sx={{ textAlign: "center", color: "primary.main" }}>
                        Spotillage
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                            mb: 6,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "primary.main" }}>
                            a collage of your favorite artists on Spotify
                        </Typography>
                        <Tooltip
                            title={
                                <>
                                    <Typography variant="h5"></Typography>
                                    <Typography>
                                        Spotillage shows you a list of your top 20 favorite artists{" "}
                                        {"\u2013"} in the form of a collage. Click on an artist
                                        image and you will see further details like: the music
                                        genres which the artist covers, the tracks you listen to the
                                        most, and the general popularity of the artist on Spotify.
                                    </Typography>
                                </>
                            }
                            arrow
                        >
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
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
                            {!!focusedArtist && (
                                <ArtistDetails artist={focusedArtist} rank={rank} />
                            )}
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
                                    sx={{cursor: "pointer"}}
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
