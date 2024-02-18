import { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useAuthContext } from '../../context/AuthContext';
import {
    deleteProductFromCart,
    getCartByUserId,
    getCartId,
    updateCartStatus,
} from '../../services/cartsService';
import { createOrder } from '../../services/ordersService';
import { useCartContext } from '../../context/CartContext';

export interface Product {
    id: string;
    label: string;
    price: number;
    img: string;
    seller_id: string;
}
export interface Cart {
    id: string;
    product_id: string[];
    products: Product[];
    status: string;
    userCustomerId: string;
}

export const ShoppingCart = () => {
    const { user } = useAuthContext();
    const { cart, setCart } = useCartContext();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
    };

    if (!cart) {
        return null;
    }

    const { products } = cart;

    const handleDeleteProduct = async (productId: string) => {
        const currentCartId = await getCartId(user.uuid);

        try {
            await deleteProductFromCart(currentCartId, productId);
            const updatedCart = await getCartByUserId(user.uuid);
            setCart(updatedCart as Cart);

            cartTotal();
        } catch (error) {
            console.log(error);
        }
    };

    const handleValidateCart = async () => {
        try {
            await createOrder(user.uuid, products);
            if (user.uuid) {
                await updateCartStatus(user.uuid);
                handleClickOpen();
            } else {
                console.error('Cart is not defined or missing id');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cartTotal = () => {
        if (!cart) {
            return 0;
        }

        const { products } = cart;
        const total = products.reduce(
            (acc, product) => acc + parseFloat(product.price.toString()), //to handle float number
            0
        );
        return total;
    };

    return (
        <>
            <TableContainer component={Paper} elevation={1}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#808080' }}>Product</TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}>
                                Price
                            </TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}></TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products &&
                            products.map((product, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.label}
                                    </TableCell>
                                    <TableCell align="right">
                                        {product.price}
                                        &nbsp;&euro;
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleDeleteProduct(product.id)}>
                                            <Delete color="primary" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {products && products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography align="center">Your cart is empty</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {products && cartTotal() !== 0 && (
                <>
                    <Typography align="right" variant="h6">
                        Total : {cartTotal()}&nbsp;&euro;
                    </Typography>
                    <Button onClick={() => handleValidateCart()} variant="contained">
                        Validate your cart
                    </Button>
                </>
            )}
            {products === undefined && <Typography align="center">Your cart is empty</Typography>}

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                {"Your order is completed"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Thanks for your order. Please refresh the page to see the changes.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
