import { db } from '../config/firebase';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    DocumentData,
    getDoc,
} from 'firebase/firestore';

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
    sellerId?: string;
}
export const getOrdersByCustomerId = async (customerId: string): Promise<Order[]> => {
    const ordersQuery = query(collection(db, 'orders'), where('customerId', '==', customerId));
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
export const createOrder = async (
    customerId: string,
    products: Product[]
): Promise<DocumentData | undefined | null> => {
    try {
        const orderRef = await addDoc(collection(db, 'orders'), {
            customerId: customerId,
            date: new Date().toISOString(),
            products: products,
        });

        const orderSnapshot = await getDoc(orderRef);
        const orderData = orderSnapshot.data();

        return orderData;
    } catch (error) {
        console.error('Erreur lors de la création de la commande :', error);
        return null;
    }
};

export const getOrdersBySellerId = async (sellerId: string): Promise<any> => {
    const ordersQuery = query(collection(db, 'orders'));
    const querySnapshot = await getDocs(ordersQuery);
    const orders: Order[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const filteredProducts = data.products.filter((product: Product) => product.sellerId === sellerId);
        return {
            orderId: doc.id,
            customerId: data.customerId,
            date: data.date,
            products: filteredProducts,
        };
    });
    return orders;
};
