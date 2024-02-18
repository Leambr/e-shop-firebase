import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../components/ShoppingCart/ShoppingCart';
import { getAllProducts } from '../../services/productsService';
import s from './ProductPage.module.css';

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={s.container}>
            <Typography variant="titleL" sx={{ mb: 5 }}>
                Products
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}></Stack>
            </Stack>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
