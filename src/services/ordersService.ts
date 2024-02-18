import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export interface Order {
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
export const getOrdersByCustomerId = async (customerId: string): Promise<Order[]> => {
    const ordersQuery = query(collection(db, 'orders'), where('customer_id', '==', customerId));
    const querySnapshot = await getDocs(ordersQuery);
    const orders: Order[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            orderId: doc.id,
            customerId: data.customer_id,
            date: data.date,
            products: data.products,
        };
    });
    return orders;
};
