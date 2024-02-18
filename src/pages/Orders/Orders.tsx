import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useState, useEffect, SetStateAction } from 'react';
import { getOrdersByCustomerId } from '../../services/ordersService';
import { Timestamp } from 'firebase/firestore';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard';

import './orders.css';

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

function formatTimestamp(timestamp: Timestamp) {
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);

    const date = new Date(milliseconds);

    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return formattedDate;
}

export default function OrdersPage() {
    const navigate = useNavigate();
    const { Logout } = useAuthContext();
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

    const handleLogout = async () => {
        try {
            await Logout();
            navigate('/sign-in');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <h1>Orders</h1>

            <List
                className="orderRow"
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
                                <div className="orderRowCommandTitle">
                                    <Typography variant="h5">Order ID : {order.orderId}</Typography>
                                </div>

                                <Typography variant="h5">{formatTimestamp(order.date)}</Typography>
                            </ListItemButton>
                            <Collapse
                                in={orderOpened === order.orderId}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List
                                    key={order.orderId}
                                    className="products"
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
