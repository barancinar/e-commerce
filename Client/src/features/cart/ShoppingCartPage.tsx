import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Button,
    Alert,
    Box,
} from "@mui/material";
import {
    AddCircleOutline,
    Delete,
    RemoveCircleOutline,
} from "@mui/icons-material";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link } from "react-router";

export default function ShoppingCartPage() {
    const { cart, status } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    if (cart?.cartItems.length === 0) {
        return <Alert severity="info">Sepetinizde ürün bulunmamaktadır.</Alert>;
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ürün</TableCell>
                            <TableCell align="right">Fiyat</TableCell>
                            <TableCell align="right">Adet</TableCell>
                            <TableCell align="right">Toplam</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart?.cartItems.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <img
                                        src={`http://localhost:5173/images/${item.imageUrl}`}
                                        alt={item.name}
                                        style={{
                                            width: 80,
                                            height: 60,
                                            objectFit: "cover",
                                        }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">
                                    {currencyTRY.format(item.price)}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        loading={
                                            status ===
                                            "pendingDeleteItem" +
                                                item.productId +
                                                "single"
                                        }
                                        onClick={() =>
                                            dispatch(
                                                deleteItemFromCart({
                                                    productId: item.productId,
                                                    key: "single",
                                                })
                                            )
                                        }
                                    >
                                        <RemoveCircleOutline />
                                    </Button>
                                    {item.quantity}
                                    <Button
                                        loading={
                                            status ===
                                            "pendingAddItem" + item.productId
                                        }
                                        onClick={() =>
                                            dispatch(
                                                addItemToCart({
                                                    productId: item.productId,
                                                })
                                            )
                                        }
                                    >
                                        <AddCircleOutline />
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    {currencyTRY.format(
                                        item.price * item.quantity
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="error"
                                        loading={
                                            status ===
                                            "pendingDeleteItem" +
                                                item.productId +
                                                "all"
                                        }
                                        onClick={() =>
                                            dispatch(
                                                deleteItemFromCart({
                                                    productId: item.productId,
                                                    quantity: item.quantity,
                                                    key: "all",
                                                })
                                            )
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {
                            // Cart Summary
                            <CartSummary />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: 3 }}>
                <Button
                    component={Link}
                    to="/checkout"
                    variant="contained"
                    color="primary"
                >
                    Checkout
                </Button>
            </Box>
        </>
    );
}
