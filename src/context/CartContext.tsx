import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Cart } from '../components/ShoppingCart/ShoppingCart';
import { createCart, getCartByUserId } from '../services/cartsService';
import { useAuthContext } from './AuthContext';

interface CartContextType {
    cart: Cart | null;
    setCart: (cart: Cart) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const { user } = useAuthContext();

    const fetchCart = async () => {
        if (!user || !user.uuid) {
            return;
        }

        try {
            const cart = await getCartByUserId(user.uuid);
            if (!cart) {
                const newCart = await createCart(user.uuid);
                setCart(newCart as Cart);
            } else {
                setCart(cart as Cart);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du panier :', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};
