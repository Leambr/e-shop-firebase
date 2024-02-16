import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useState, useEffect, SetStateAction } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

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

export default function OrdersPage() {
    const navigate = useNavigate();
    const { Logout } = useAuthContext();
    const [orders, setOrders] = useState<Array<Order>>();
    const [orderOpened, setOrderOpened] = useState<string>();

    useEffect(() => {
        // Fetch orders from your backend API or any other source
        const fetchOrders = async () => {
            try {
                // Simulated orders fetching
                const fetchedOrders: Array<Order> = [
                    {
                        orderId: 'orderId',
                        customerId: 'customerId',
                        date: 'date',
                        products: [
                            {
                                id: 'id',
                                label: 'label',
                                price: 12,
                                img: 'img',
                                seller_id: 'seller_id',
                            },
                            {
                                id: 'id1',
                                label: 'label',
                                price: 12,
                                img: 'img',
                                seller_id: 'seller_id',
                            },
                            {
                                id: 'id2',
                                label: 'label',
                                price: 12,
                                img: 'img',
                                seller_id: 'seller_id',
                            },
                        ],
                    },
                    {
                        orderId: 'orderId2',
                        customerId: 'customerId',
                        date: 'date',
                        products: [
                            {
                                id: 'id',
                                label: 'label',
                                price: 12,
                                img: 'img',
                                seller_id: 'seller_id',
                            },
                            {
                                id: 'id1',
                                label: 'label',
                                price: 12,
                                img: 'img',
                                seller_id: 'seller_id',
                            },
                        ],
                    },
                ];
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

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
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {orders &&
                    orders.map((order) => (
                        <>
                            <ListItemButton
                                key={order.orderId}
                                onClick={() => handleClick(order.orderId)}
                            >
                                <div className="orderRow">
                                    <Typography variant="h4">{order.orderId}</Typography>
                                </div>

                                <Typography variant="h4">{order.date}</Typography>
                            </ListItemButton>
                            <Collapse
                                in={orderOpened === order.orderId}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    {order.products &&
                                        order.products.map((product) => (
                                            <div className="order" key={product.id}>
                                                <Typography variant="h4">{product.img}</Typography>
                                                <Typography variant="h4">
                                                    {product.label}
                                                </Typography>
                                                <Typography variant="h4">
                                                    {product.price}
                                                </Typography>
                                            </div>
                                        ))}
                                </List>
                            </Collapse>
                        </>
                    ))}
            </List>
        </div>
    );
}
