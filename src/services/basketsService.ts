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
    DocumentData,
    setDoc,
} from 'firebase/firestore';

export const getBasketId = async (): Promise<string> => {
    const basketsCollection = collection(db, 'baskets');
    const querySnapshot = await getDocs(basketsCollection);

    let basketId: string | undefined;
    querySnapshot.forEach((doc) => {
        basketId = doc.id;
    });

    return basketId || '';
};

export const addProductToBasket = async (
    basketId: string,
    productId: string,
    label: string,
    price: number
) => {
    try {
        const basketRef = doc(db, 'baskets', basketId);
        const basketSnapshot = await getDoc(basketRef);
        if (basketSnapshot.exists()) {
            const basketData = basketSnapshot.data();
            if (Object.prototype.hasOwnProperty.call(basketData, 'product_id')) {
                await updateDoc(basketRef, {
                    product_id: arrayUnion(productId),
                    products: arrayUnion({ id: productId, label, price }),
                });
            } else {
                await setDoc(
                    basketRef,
                    {
                        product_id: [productId],
                        products: [{ id: productId, label, price }],
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
        const lowerCaseUserId = uid.toLowerCase();
        const basketQuery = query(
            collection(db, 'baskets'),
            where('customer_id', '==', lowerCaseUserId),
            where('status', '==', 'created')
        );

        const basketSnapshot = await getDocs(basketQuery);

        if (!basketSnapshot.empty) {
            const basketData = basketSnapshot.docs[0].data();
            return basketData;
        }

        console.log(`No document found with ID ${uid} in the 'baskets' collection`);
        return null;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'élément :", error);
        return null;
    }
};
