import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import AndroidIcon from "@mui/icons-material/Android";
import Button from "@mui/material/Button";
import { useErrorBoundary } from "react-error-boundary";

function FallbackOnError() {
    const { resetBoundary } = useErrorBoundary();
    return (
        <Container sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3">Oops, something went wrong.</Typography>
            <Typography sx={{ mt: 2 }} variant="h4">
                Please try again later!
            </Typography>
            <AndroidIcon color="primary" sx={{ fontSize: "220px" }} />
            <Button sx={{ mt: 4 }} onClick={resetBoundary}>
                Try again
            </Button>
        </Container>
    );
}

export default FallbackOnError;
