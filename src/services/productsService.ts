import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addProduct = async (label: string, price: string, img: string, sid: string) => {
    await addDoc(collection(db, 'products'), {
        label: label.toLowerCase(),
        price: price,
        img: img,
        sid: sid,
    });
};

export const getAllProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        const productsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return productsData;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        return [];
    }
};
