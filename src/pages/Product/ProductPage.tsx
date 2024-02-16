import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';
// import ProductCartWidget from '../product-cart-widget';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../_mock/product';
import s from './ProductPage.module.css';

// ----------------------------------------------------------------------

export default function ProductPage() {
    // const [openFilter, setOpenFilter] = useState(false);

    // const handleOpenFilter = () => {
    //     setOpenFilter(true);
    // };

    // const handleCloseFilter = () => {
    //     setOpenFilter(false);
    // };

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
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    {/* <ProductFilters
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                    />

                    <ProductSort /> */}
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            {/* <ProductCartWidget /> */}
        </div>
    );
}
