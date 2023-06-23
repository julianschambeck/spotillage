import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import AndroidIcon from "@mui/icons-material/Android";

function FallbackOnError() {
    return (
        <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3">Oops, something went wrong.</Typography>
            <Typography sx={{ mt: 2 }} variant="h4">
                Please try again later!
            </Typography>
            <AndroidIcon color="primary" sx={{ fontSize: "220px" }} />
            <Typography sx={{ mt: 4 }}>
                Click <Link href="http://localhost:3000">here</Link> to try again
            </Typography>
        </Container>
    );
}

export default FallbackOnError;
