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
import { getCartByUserId } from '../../services/cartsService';

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

    useEffect(() => {
        getCart();
    }, [user.uuid]);

    if (!cart) {
        return null;
    }

    const { products } = cart;
    console.log('🚀 ~ ShoppingCart ~ products:', products);

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
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="right">
                                        <IconButton>
                                            <Delete color="primary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
