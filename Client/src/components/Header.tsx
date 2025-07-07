import { ShoppingCart } from "@mui/icons-material";
import {
    AppBar,
    Badge,
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";

const links = [
    { title: "Home", path: "/" },
    { title: "Catalog", path: "/catalog" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Error", path: "/error" },
];

const authLinks = [
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
];

const brandStyles = {
    marginRight: "15px",
    fontWeight: "bold",
};

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    "&.active": {
        color: "white",
        fontWeight: "bold",
        backgroundColor: "secondary.main",
    },
    "&:hover": {
        color: "secondary.main",
        backgroundColor: "#f0f0f0",
    },
};

export default function Header() {
    const { cart } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();

    const itemCount = cart
        ? cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

    return (
        <AppBar position="static" sx={{ mb: 4, backgroundColor: "#" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={brandStyles} variant="h6">
                        E-Commerce
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                        {links.map((link) => (
                            <Button
                                key={link.path}
                                component={NavLink}
                                to={link.path}
                                sx={navStyles}
                            >
                                {link.title}
                            </Button>
                        ))}
                    </Stack>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        component={Link}
                        to="/cart"
                        size="large"
                        color="inherit"
                        edge="start"
                    >
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                            <Button sx={navStyles}>{user.name}</Button>
                            <Button
                                sx={navStyles}
                                onClick={() => {
                                    dispatch(logout());
                                    dispatch(clearCart());
                                }}
                            >
                                Log Out
                            </Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                            {authLinks.map((link) => (
                                <Button
                                    key={link.path}
                                    component={NavLink}
                                    to={link.path}
                                    sx={navStyles}
                                >
                                    {link.title}
                                </Button>
                            ))}
                        </Stack>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
