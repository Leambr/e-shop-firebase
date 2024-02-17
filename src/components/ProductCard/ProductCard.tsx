import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Cart, Product } from '../ShoppingCart/ShoppingCart';
import { useAuthContext } from '../../context/AuthContext';
import {
    addProductToCart,
    createCart,
    getCartByUserId,
    getCartId,
} from '../../services/cartsService';

export default function ShopProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);
    const [cart, setCart] = useState<Cart>();

    const { user } = useAuthContext();

    const getCart = async () => {
        if (user && user.uuid) {
            const currentCart = await getCartByUserId(user.uuid);

            if (currentCart === null || currentCart === undefined) {
                console.log("Aucun panier trouvé, création d'un nouveau panier");

                const newCart = await createCart(user.uuid);

                setCart(newCart as Cart);
                return newCart;
            }
            console.log('Panier existant trouvé');
            setCart(currentCart as Cart);
            return currentCart;
        }
    };

    const handleAddToCart = async (productId: string, label: string, price: number) => {
        const currentCartId = await getCartId(user.uuid);

        try {
            await addProductToCart(currentCartId, productId, label, price);
            const updatedCart = await getCart();
            setCart(updatedCart as Cart);
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageHover = () => {
        setIsHovered(!isHovered);
    };

    useEffect(() => {
        if (user && user.uuid) {
            getCart();
        }
    }, [user]);

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
        <Card onMouseEnter={handleImageHover} onMouseLeave={handleImageHover}>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {renderImg}
                {isHovered && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            m: 'auto',
                        }}
                        onClick={() => handleAddToCart(product.id, product.label, product.price)}
                        disabled={!cart}
                    >
                        Add to cart
                    </Button>
                )}
                {cart && cart.product_id && cart.product_id.indexOf(product.id) !== -1 && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            m: 'auto',
                        }}
                        disabled={!cart}
                    >
                        Product already in cart
                    </Button>
                )}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                    {product.label}
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {renderPrice}
                </Stack>
            </Stack>
        </Card>
    );
}
