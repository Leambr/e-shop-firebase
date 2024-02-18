import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

export const addProduct = async (label: string, price: number, img: string, sellerId: string) => {
    await addDoc(collection(db, 'products'), {
        label: label.toLowerCase(),
        price: price,
        img: img,
        seller_id: sellerId,
    });
};

export const getAllProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        const productsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            label: doc.data().label,
            price: doc.data().price,
            ...doc.data(),
        }));

        return productsData;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        return [];
    }
};

export const getProductsBySellerId = async (sellerId: string) => {
    try {
        const q = query(collection(db, 'products'), where('seller_id', '==', sellerId));
        const snapshot = await getDocs(q);

        const productsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            label: doc.data().label,
            price: doc.data().price,
            ...doc.data(),
        }));
        return productsData;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        return [];
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        const productRef = doc(db, 'products', productId);
        await deleteDoc(productRef);
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
    }
}

