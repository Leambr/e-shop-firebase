import { db } from '../config/firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion, query, where, getDocs, getDoc, DocumentSnapshot, DocumentData } from "firebase/firestore";

interface Basket {
    productId: string[];
    status: string;
    userCustomerId: string;
  }
  

export const addProductToBasket = async (basketId: string, productId: string) => {
    try {
        const basketRef = doc(db, "baskets", basketId);

        await updateDoc(basketRef, {
            product_id: arrayUnion(productId)
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit au panier :", error);
    }
};

export const createBasket = async (uid:string) => {
    
    try {
        await addDoc(collection(db, 'baskets'), {
            user_customer_id: uid.toLowerCase(),
            status:"created",
            product_id:[]
        });
        
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit au panier :", error);
    }
};

export const getBasketById = async (bid: string): Promise<DocumentData | undefined | null> => {
    try {
        const basketRef = doc(db, "baskets", bid);

        const basketSnapshot = await getDoc(basketRef);

        if (basketSnapshot.exists()) {

            const basketData = basketSnapshot.data()
            return basketData;
        } else {
            console.log(`Aucun document trouvé avec l'ID ${bid} dans la collection 'baskets'`);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'élément :", error);
        return null;
    }
};