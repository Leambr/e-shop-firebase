import { 
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
 } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { Cart, Product } from '../ShoppingCart/ShoppingCart';
import { addProductToCart, getCartByUserId, getCartId } from '../../services/cartsService';
import { useAuthContext } from '../../context/AuthContext';

export default function ShopProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);

    const { user } = useAuthContext();
    const { cart, setCart } = useCartContext();

    const handleAddToCart = async (
        productId: string,
        label: string,
        price: number,
        img: string,
        sellerId: string
    ) => {
        const currentCartId = await getCartId(user.uuid);

        try {
            await addProductToCart(currentCartId, productId, label, price, img, sellerId);
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
                        onClick={() =>
                            handleAddToCart(
                                product.id,
                                product.label,
                                product.price,
                                product.img,
                                product.seller_id
                            )
                        }
                        disabled={!cart}
                    >
                        Add to cart
                    </Button>
                )}
                {cart && cart.product_id && cart.product_id.includes(product.id) && (
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
        )}

        {user.role === 'seller' && (
            <TableContainer component={Paper} elevation={1}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#808080' }}>Product</TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}>
                                Price
                            </TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}>
                                Image
                            </TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        )}
        </>
    );
}
