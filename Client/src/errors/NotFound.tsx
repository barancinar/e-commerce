import { Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function ServerError() {
  return (
    <Container component={Card} sx={{ mt: 4, mb: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Not Found
      </Typography>
      <Divider />
      <Button
        variant="contained"
        component={NavLink}
        to="/catalog"
        sx={{ mt: 2 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
