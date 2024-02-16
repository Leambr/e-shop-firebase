import Typography from '@mui/material/Typography';

import s from './ShoppingCartPage.module.css';
import { ShoppingCart } from '../../components/ShoppingCart/ShoppingCart';

export default function ShoppingCartPage() {
    return (
        <div className={s.container}>
            <Typography variant="titleL" sx={{ mb: 5 }}>
                Your cart
            </Typography>
            <ShoppingCart />
        </div>
    );
}
