import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Add, ShoppingBagOutlined, ShoppingBasketSharp } from '@mui/icons-material';
import { useState } from 'react';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleImageHover = () => {
        setIsHovered(!isHovered);
    };

    const renderImg = (
        <Box
            component="img"
            alt={product.name}
            src={product.cover}
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
                    >
                        Add to cart
                    </Button>
                )}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                    {product.name}
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {renderPrice}
                </Stack>
            </Stack>
        </Card>
    );
}
