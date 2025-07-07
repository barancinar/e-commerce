import { TableCell, TableRow } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../store/store";

export default function CartSummary() {
    const { cart } = useAppSelector((state) => state.cart);
    const subTotal =
        cart?.cartItems.reduce(
            (toplam, item) => toplam + item.quantity * item.price,
            0
        ) ?? 0;
    const tax = subTotal * 0.2; // %20 vergi
    const total = subTotal + tax;

    return (
        <>
            <TableRow>
                <TableCell colSpan={5} align="right">
                    <strong>Ara Toplam</strong>
                </TableCell>
                <TableCell align="right">
                    {currencyTRY.format(subTotal)}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} align="right">
                    <strong>Vergi (%20)</strong>
                </TableCell>
                <TableCell align="right">{currencyTRY.format(tax)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} align="right">
                    <strong>Toplam</strong>
                </TableCell>
                <TableCell align="right">{currencyTRY.format(total)}</TableCell>
            </TableRow>
        </>
    );
}
