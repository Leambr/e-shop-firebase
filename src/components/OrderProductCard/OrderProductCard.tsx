import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
// import { useAuthContext } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';
import { Cart, Product } from '../ShoppingCart/ShoppingCart';
import { addProductToCart, getCartByUserId, getCartId } from '../../services/cartsService';
import { useAuthContext } from '../../context/AuthContext';

import './OrderProductCard.css';

export default function ShopProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);

    const { user } = useAuthContext();
    const { cart, setCart } = useCartContext();

    const handleAddToCart = async (productId: string, label: string, price: number) => {
        const currentCartId = await getCartId(user.uuid);

        try {
            await addProductToCart(currentCartId, productId, label, price);
            const updatedCart = await getCartByUserId(user.uuid);
            setCart(updatedCart as Cart);
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageHover = () => {
        setIsHovered(!isHovered);
    };

    const renderImg = (
        <Box
            component="img"
            alt={product.label}
            src={product.img}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
        />
    );

    const renderPrice = (
        <Typography variant="subtitle1">
            {product.price}
            &nbsp;&euro;
        </Typography>
    );

    return (
        <Card
            className="productCard"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageHover}
        >
            <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover" variant="subtitle1" noWrap>
                    {product.label}
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {renderPrice}
                </Stack>
            </Stack>
        </Card>
    );
}
