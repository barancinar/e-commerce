import { Card, Container, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Container component={Card} sx={{ mt: 4, mb: 4, p: 3 }}>
      {state?.error ? (
        <>
          <Typography variant="h3" gutterBottom>
            {state.error.title} - {state.status}
          </Typography>
          <Divider />
          <Typography variant="body2">
            {state.error.detail || "Unknown Error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h3" gutterBottom>
          Server Error
        </Typography>
      )}
    </Container>
  );
}
