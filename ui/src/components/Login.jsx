import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function Login() {
    return (
        <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3">You are almost there.</Typography>
            <Box sx={{ mt: 2, display: "flex", flexDirection: "row", width: "60%" }}>
                <Typography>
                    First you need to login to Spotify{" "}
                    <Link href="http://localhost:8888/login" target="_blank" rel="noopener">
                        here
                    </Link>
                    . This is so that Spotillage can list your favorite artists. Don't worry,
                    Spotillage does not story any of your Spotify data nor your Spotify Account
                    credentials.
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;
