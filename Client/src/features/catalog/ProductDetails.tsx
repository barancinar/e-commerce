import {
    Container,
    Typography,
    Divider,
    Button,
    Paper,
    Box,
    Rating,
    Chip,
    Grid,
    Stack,
    Fade,
    Zoom,
    IconButton,
    useTheme,
    CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect } from "react";
import { useParams } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { fetchProductById, selectProductById } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ProductDetailsPage() {
    const theme = useTheme();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector((state) =>
        selectProductById(state, Number(id))
    );

    const loading = useAppSelector((state) => state.catalog.status);

    const { cart, status } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const item = cart?.cartItems.find((i) => i.productId === product?.id);

    useEffect(() => {
        if (!product && id) dispatch(fetchProductById(parseInt(id)));
    }, [id]);

    if (loading === "pendingFetchProductById") return <CircularProgress />;
    if (!product) return <h5>Product not found</h5>;

    return (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Fade in={true} timeout={1000}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        background:
                            "linear-gradient(to right bottom, #ffffff, #fafafa)",
                        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
                    }}
                >
                    <Grid container spacing={6}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Zoom in={true} timeout={750}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        "&:hover": {
                                            "& .MuiBox-root": { opacity: 1 },
                                            "& img": {
                                                transform: "scale(1.10)",
                                            },
                                        },
                                    }}
                                >
                                    <img
                                        src={`http://localhost:5173/images/${product.imageUrl}`}
                                        alt={product.name}
                                        style={{
                                            width: "100%",
                                            height: "600px",
                                            objectFit: "contain",
                                            borderRadius: "16px",
                                            transition:
                                                "transform 0.3s ease-in-out",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            right: 16,
                                            opacity: 0,
                                            transition:
                                                "opacity 0.3s ease-in-out",
                                        }}
                                    >
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                sx={{ bgcolor: "white" }}
                                            >
                                                <FavoriteIcon color="error" />
                                            </IconButton>
                                            <IconButton
                                                sx={{ bgcolor: "white" }}
                                            >
                                                <ShareIcon color="primary" />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Zoom>
                        </Grid>

                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box sx={{ pl: { md: 4 } }}>
                                <Chip
                                    label="Yeni Ürün"
                                    color="primary"
                                    sx={{
                                        borderRadius: "8px",
                                        mb: 2,
                                        background:
                                            theme.palette.primary.main + "20",
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                    }}
                                />

                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 700,
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    {product.name}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    sx={{ mb: 3 }}
                                >
                                    <Rating
                                        value={4}
                                        readOnly
                                        precision={0.5}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        (128 değerlendirme)
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 600,
                                        mb: 3,
                                    }}
                                >
                                    {currencyTRY.format(product.price)} ₺
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        mb: 4,
                                        color: "text.secondary",
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {product.description}
                                </Typography>

                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<ShoppingCartIcon />}
                                    sx={{
                                        borderRadius: "12px",
                                        py: 2,
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        width: "100%",
                                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                        transition: "transform 0.2s",
                                        "&:hover": {
                                            transform: "scale(1.02)",
                                        },
                                    }}
                                    loading={
                                        status === "pendingAddItem" + product.id
                                    }
                                    onClick={() =>
                                        dispatch(
                                            addItemToCart({
                                                productId: product.id,
                                            })
                                        )
                                    }
                                >
                                    Sepete Ekle
                                </Button>

                                {item?.quantity! > 0 && (
                                    <Box
                                        sx={{
                                            mt: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor:
                                                theme.palette.primary.main +
                                                "08",
                                            border: `1px solid ${theme.palette.primary.main}20`,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <ShoppingCartIcon
                                            sx={{
                                                color: theme.palette.primary
                                                    .main,
                                                opacity: 0.8,
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.primary
                                                    .main,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Sepetinizde {item?.quantity} adet bu
                                            üründen bulunuyor
                                        </Typography>
                                    </Box>
                                )}

                                <Stack
                                    direction="row"
                                    spacing={3}
                                    sx={{
                                        mt: 4,
                                        p: 3,
                                        borderRadius: 2,
                                        bgcolor: "background.default",
                                    }}
                                >
                                    <Box sx={{ textAlign: "center", flex: 1 }}>
                                        <LocalShippingIcon
                                            color="primary"
                                            sx={{ fontSize: 32, mb: 1 }}
                                        />
                                        <Typography
                                            variant="body2"
                                            fontWeight="medium"
                                        >
                                            Ücretsiz Kargo
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box sx={{ textAlign: "center", flex: 1 }}>
                                        <AssignmentReturnIcon
                                            color="primary"
                                            sx={{ fontSize: 32, mb: 1 }}
                                        />
                                        <Typography
                                            variant="body2"
                                            fontWeight="medium"
                                        >
                                            30 Gün İade
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
        </Container>
    );
}
