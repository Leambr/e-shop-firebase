import React, { useEffect, useState } from 'react';
import {
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
import { useAuthContext } from '../../context/AuthContext';
import { deleteProductFromCart, getCartByUserId, getCartId } from '../../services/cartsService';

export interface Product {
    id: string;
    label: string;
    price: number;
    img?: string;
    seller_id?: string;
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
    const [cart, setCart] = useState<Cart>();
    console.log('🚀 ~ ShoppingCart ~ cart:', cart);

    const getCart = async () => {
        if (user && user.uuid) {
            const currentCart = await getCartByUserId(user.uuid);

            if (currentCart === null || currentCart === undefined) {
                return null;
            }

            setCart(currentCart as Cart);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        const currentCartId = await getCartId(user.uuid);

        try {
            await deleteProductFromCart(currentCartId, productId);
            getCart();
            cartTotal();
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

    useEffect(() => {
        getCart();
    }, [user.uuid]);

    if (!cart) {
        return null;
    }

    const { products } = cart;

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
            {cartTotal() !== 0 && (
                <Typography align="right" variant="h6">
                    Total : {cartTotal()}&nbsp;&euro;
                </Typography>
            )}
            {products === undefined && <Typography align="center">Your cart is empty</Typography>}
        </>
    );
};
