import { db } from '../config/firebase';
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    arrayUnion,
    query,
    where,
    getDocs,
    getDoc,
    DocumentSnapshot,
    DocumentData,
    setDoc,
} from 'firebase/firestore';

interface Basket {
    id: string;
    productId: string[];
    status: string;
    userCustomerId: string;
}

export const addProductToBasket = async (basketId: string, productId: string) => {
    try {
        const basketRef = doc(db, 'baskets', basketId);
        const basketSnapshot = await getDoc(basketRef);
        if (basketSnapshot.exists()) {
            const basketData = basketSnapshot.data();
            if (Object.prototype.hasOwnProperty.call(basketData, 'product_id')) {
                await updateDoc(basketRef, {
                    product_id: arrayUnion(productId),
                });
            } else {
                await setDoc(
                    basketRef,
                    {
                        product_id: [productId],
                    },
                    { merge: true }
                );
            }
        } else {
            console.log("Le panier n'existe pas");
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit au panier :", error);
    }
};

export const createBasket = async (uid: string): Promise<DocumentData | undefined | null> => {
    try {
        const basket = await addDoc(collection(db, 'baskets'), {
            customer_id: uid.toLowerCase(),
            status: 'created',
            product_id: [],
        });

        return basket;
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit au panier :", error);
    }
};

export const getBasketByUserId = async (uid: string): Promise<DocumentData | undefined | null> => {
    try {
        const basketQuery = query(collection(db, 'baskets'), where('customer_id', '==', uid));

        const basketSnapshot = await getDocs(basketQuery);

        if (!basketSnapshot.empty) {
            const basketData = basketSnapshot.docs[0].data();
            return basketData;
        } else {
            console.log(`No document found with ID ${uid} in the 'baskets' collection`);
            return null;
        }
        // console.log('basketref', basketRef);

        // const basketSnapshot = await getDoc(basketRef);

        // if (basketSnapshot.docs.length > 0) {
        //     const basketData = basketSnapshot.docs[0].data();
        //     return basketData;
        // } else {
        //     console.log(`Aucun document trouvé avec l'ID ${uid} dans la collection 'baskets'`);
        //     return null;
        // }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'élément :", error);
        return null;
    }
};
