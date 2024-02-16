import { Product } from '../components/ShoppingCart/ShoppingCart';
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

export const getCartId = async (): Promise<string> => {
    const cartsCollection = collection(db, 'carts');
    const querySnapshot = await getDocs(cartsCollection);

    let cartId: string | undefined;
    querySnapshot.forEach((doc) => {
        cartId = doc.id;
    });

    return cartId || '';
};

export const addProductToCart = async (
    cartId: string,
    productId: string,
    label: string,
    price: number
) => {
    try {
        const cartRef = doc(db, 'carts', cartId);
        const cartSnapshot = await getDoc(cartRef);
        if (cartSnapshot.exists()) {
            const cartData = cartSnapshot.data();
            if (Object.prototype.hasOwnProperty.call(cartData, 'product_id')) {
                await updateDoc(cartRef, {
                    product_id: arrayUnion(productId),
                    products: arrayUnion({ id: productId, label, price }),
                });
            } else {
                await setDoc(
                    cartRef,
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

export const createCart = async (uid: string): Promise<DocumentData | undefined | null> => {
    try {
        const cartRef = await addDoc(collection(db, 'carts'), {
            customer_id: uid.toLowerCase(),
            status: 'created',
            product_id: [],
        });

        // Fetch the newly created cart to return its data
        const cartSnapshot = await getDoc(cartRef);
        const cartData = cartSnapshot.data();

        return cartData;
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit au panier :", error);
        return null;
    }
};

export const getCartByUserId = async (uid: string): Promise<DocumentData | undefined | null> => {
    try {
        const lowerCaseUserId = uid.toLowerCase();
        const cartQuery = query(
            collection(db, 'carts'),
            where('customer_id', '==', lowerCaseUserId),
            where('status', '==', 'created')
        );

        const cartSnapshot = await getDocs(cartQuery);

        if (!cartSnapshot.empty) {
            const cartData = cartSnapshot.docs[0].data();
            return cartData;
        }

        console.log(`No document found with ID ${uid} in the 'carts' collection`);
        return null;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'élément :", error);
        return null;
    }
};

export const deleteProductFromCart = async (cartId: string, productId: string) => {
    try {
        const cartRef = doc(db, 'carts', cartId);
        const cartSnapshot = await getDoc(cartRef);

        if (cartSnapshot.exists()) {
            const cartData = cartSnapshot.data();
            if (Object.prototype.hasOwnProperty.call(cartData, 'product_id')) {
                const updatedProductIds = cartData.product_id.filter(
                    (id: string) => id !== productId
                );
                const updatedProducts = cartData.products.filter(
                    (product: Product) => product.id !== productId
                );

                await updateDoc(cartRef, {
                    product_id: updatedProductIds,
                    products: updatedProducts,
                });
            }
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du produit du panier :', error);
    }
};
