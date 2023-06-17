import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function ArtistDetails({ artist, rank }) {
    return (
        <Paper elevation={1} sx={{ padding: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">{artist.name}</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: 2,
                        borderRadius: 5,
                        borderColor: "primary.default",
                        width: 42,
                        height: 42,
                    }}
                >
                    <Typography sx={{ color: "primary.default" }} variant="h5">
                        {rank}
                    </Typography>
                </Box>
            </Box>
            <Typography>Popularity: {artist.popularity}/100</Typography>
            <Typography>
                Check out this artist's{" "}
                <Link href={artist.external_urls.spotify} underline="hover" target="_blank" rel="noopener">
                    Spotify Profile
                </Link>
                .
            </Typography>
            {artist.genres.length > 0 && (
                <>
                    <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
                    <Typography>Genres:</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 0,
                            mt: 1,
                        }}
                        component="ul"
                    >
                        {artist.genres.map((genre, index) => {
                            let icon;
                            return (
                                <ListItem key={index}>
                                    <Chip
                                        icon={icon}
                                        label={genre}
                                        sx={{ backgroundColor: "primary.default" }}
                                    />
                                </ListItem>
                            );
                        })}
                    </Box>
                </>
            )}
            {artist.tracks.length > 0 && (
                <>
                    <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
                    <Typography>Tracks of this artist that you listen to the most:</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 0,
                            mt: 1,
                        }}
                        component="ul"
                    >
                        {artist.tracks.map((track) => {
                            return (
                                <ListItem key={track.id}>
                                    <Chip
                                        label={track.name}
                                        component="a"
                                        href={track.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener"
                                        clickable
                                    />
                                </ListItem>
                            );
                        })}
                    </Box>
                </>
            )}
        </Paper>
    );
}

export default ArtistDetails;
