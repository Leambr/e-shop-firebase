import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getOrdersBySellerId = async (sellerId: string): Promise<any[]> => {
    const q = query(collection(db, 'orders'), where('seller_id', '==', sellerId));
    const querySnapshot = await getDocs(q);
    const orders: any[] = [];
    querySnapshot.forEach((doc) => {
        orders.push(doc.data());
    });
    return orders;
};
