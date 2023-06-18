import { Typography, Rating, Paper, Link, Box, Chip, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { MusicNote, Favorite, FavoriteBorder } from "@mui/icons-material";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
});

function ArtistDetails({ artist, rank }) {
    // const theme = useTheme();
    // const palette = theme.palette;
    // scale down from 0 -> 100 to 0 -> 5
    const popularityScaled = artist.popularity ? artist.popularity / 20 : 0;
    return (
        <Paper elevation={1} sx={{ padding: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        bgcolor: "primary.main",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                    }}
                >
                    <Typography sx={{ color: "primary.contrastText" }} variant="h5">
                        {rank}
                    </Typography>
                </Box>
                <Typography variant="h5" ml={1}>
                    {artist.name}
                </Typography>
            </Box>
            <Typography variant="h6" mt={2}>
                Popularity on Spotify
            </Typography>
            <StyledRating
                sx={{ mt: 1 }}
                defaultValue={popularityScaled}
                precision={0.25}
                icon={<Favorite fontSize="inherit" />}
                emptyIcon={<FavoriteBorder fontSize="inherit" />}
                readOnly
            />
            <Typography mt={1}>
                Check out this artist's{" "}
                <Link
                    href={artist.external_urls.spotify}
                    underline="hover"
                    target="_blank"
                    rel="noopener"
                >
                    Spotify Profile{" "}
                </Link>
                for more information.
            </Typography>
            {artist.genres.length > 0 && (
                <>
                    <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
                    <Typography variant="h6">Genres</Typography>
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
                            return (
                                <ListItem key={index}>
                                    <Chip
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
                    <Typography variant="h6">
                        Tracks of this artist that you listen to the most
                    </Typography>
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
                            const icon = <MusicNote />;
                            return (
                                <ListItem key={track.id}>
                                    <Chip
                                        icon={icon}
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
