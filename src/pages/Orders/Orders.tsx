import { useAuthContext } from '../../context/AuthContext';
import { useState, useEffect, SetStateAction } from 'react';
import { getOrdersByCustomerId } from '../../services/ordersService';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard';

import s from './Orders.module.css';

interface Order {
    orderId: string;
    customerId: string;
    date: string;
    products: Array<Product>;
}

export interface Product {
    id: string;
    label: string;
    price: number;
    img: string;
    seller_id?: string;
}
export interface Cart {
    id: string;
    product_id: string[];
    products: Product[];
    status: string;
    userCustomerId: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[] | undefined>();
    const [orderOpened, setOrderOpened] = useState<string>();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user || !user.uuid) {
                return;
            }
            try {
                const allOrders: Order[] = await getOrdersByCustomerId(user.uuid);
                setOrders(allOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [user]);

    const handleClick = (orderId: SetStateAction<string | undefined>) => {
        if (orderId == orderOpened) {
            setOrderOpened('');
        } else {
            setOrderOpened(orderId);
        }
    };

    return (
        <div>
            <Typography variant="titleL" sx={{ mb: 5 }}>
                Orders
            </Typography>

            <List
                className={s.orderRow}
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {orders &&
                    orders.map((order, index) => (
                        <div key={index}>
                            <ListItemButton
                                key={order.orderId}
                                onClick={() => handleClick(order.orderId)}
                            >
                                <div className={s.orderRowCommandTitle}>
                                    <Typography variant="h5">Order ID : {order.orderId}</Typography>
                                </div>
                            </ListItemButton>
                            <Collapse
                                in={orderOpened === order.orderId}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List
                                    key={order.orderId}
                                    className={s.products}
                                    component="div"
                                    disablePadding
                                >
                                    {order.products &&
                                        order.products.map((product, index) => (
                                            <div key={index}>
                                                <OrderProductCard product={product} />
                                            </div>
                                        ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                {orders && orders.length === 0 && (
                    <Typography align="center">You don't have any orders</Typography>
                )}
            </List>
        </div>
    );
}
