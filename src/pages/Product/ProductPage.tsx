import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../components/ShoppingCart/ShoppingCart';
import { getAllProducts, getProductsBySellerId } from '../../services/productsService';
import s from './ProductPage.module.css';
import { useAuthContext } from '../../context/AuthContext';
import { Box, Button, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProductList from '../../components/ProductList/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useAuthContext();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchProducts = async () => {
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
        }
    };

    const fetchSellerProducts = async () => {
        try {
            const allProducts = await getProductsBySellerId(user.uuid);
            setProducts(allProducts);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
        }
    };

    useEffect(() => {
        if (user.uuid) {
            if (user.role === 'customer') {
                fetchProducts();
            } else if (user.role === 'seller') {
                fetchSellerProducts();
            }
        }
    }, [user]);

    return (
        <div className={s.container}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="titleL" sx={{ flexGrow: 1 }}>
                    Products
                </Typography>

                {user.role === 'seller' && (
                    <Button variant="contained" color="inherit" sx={{ display: 'flex', gap: 2 }} onClick={handleOpen}>
                        <FontAwesomeIcon icon={faPlus} />
                        New Product
                    </Button>
                )}
            </Box>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}></Stack>
            </Stack>

            {user.role === 'customer' && (
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid key={product.id} xs={12} sm={6} md={4}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {user.role === 'seller' && (
                <ProductList products={products} onProductDeleted={fetchSellerProducts}/>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductForm onCloseModal={handleClose} onProductAdded={fetchSellerProducts}/>
            </Modal>
        </div>
    );
}
