import { useAuthContext } from '../../context/AuthContext';
import { useState, useEffect, SetStateAction } from 'react';
import { getOrdersByCustomerId, getOrdersBySellerId } from '../../services/ordersService';
import { Timestamp } from 'firebase/firestore';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import OrderProductCard from '../../components/OrderProductCard/OrderProductCard';

import s from './Orders.module.css';
import { 
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
 } from '@mui/material';

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

    function formatDate(inputDate: string): string {
        const date = new Date(inputDate);
      
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      }


    const handleClick = (orderId: SetStateAction<string | undefined>) => {
        if (orderId == orderOpened) {
            setOrderOpened('');
        } else {
            setOrderOpened(orderId);
        }
    };

    const fetchOrdersByCustomerId = async () => {
        try {
            const allOrders: Order[] = await getOrdersByCustomerId(user.uuid);
            setOrders(allOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchOrdersBySellerId = async () => {
        try {
            const allOrders: Order[] = await getOrdersBySellerId(user.uuid);
            setOrders(allOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (user.uuid) {
            if (user.role === 'customer') {
                fetchOrdersByCustomerId();
            } else if (user.role === 'seller') {
                fetchOrdersBySellerId();
            }
        }
    }, [user]);

    return (
        <div>
            <Typography variant="titleL" sx={{ mb: 5 }}>
                Orders
            </Typography>

            {user.role === 'customer' && (
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
            )}

            {user.role === 'seller' && (
                <TableContainer component={Paper} elevation={1}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#808080' }}>Products</TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}>
                                Price
                            </TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}>
                                Customer
                            </TableCell>

                            <TableCell align="right" style={{ color: '#808080' }}>
                                Date
                            </TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders &&
                        orders.map((order, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.products.map((product) => (
                                        <div key={product.id}>
                                            <Typography>{product.label}</Typography>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align="right">
                                    {order.products.map((product) => (
                                        <div key={product.id}>
                                            <Typography>
                                                {product.price}
                                                &nbsp;&euro;
                                            </Typography>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{order.customerId}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>{formatDate(order.date)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </div>
    );
}
