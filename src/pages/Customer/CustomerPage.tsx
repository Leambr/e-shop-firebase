import { useAuthContext } from '../../context/AuthContext';
import { getAllProducts } from '../../services/productsService';
import {
    createCart,
    getCartByUserId,
    addProductToCart,
    getCartId,
} from '../../services/cartsService';
import { useEffect, useState } from 'react';
import ProductPage from '../Product/ProductPage';

interface Product {
    id: string;
    label: string;
    price: number;
    img?: string;
    seller_id?: string;
}
interface Cart {
    id: string;
    product_id: string[];
    status: string;
    userCustomerId: string;
}

export default function CustomerPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Cart>();
    const { user } = useAuthContext();

    const fetchProducts = async () => {
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
            console.log('products', products);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        if (user && user.uuid) {
            getCart();
        }
    }, [user]);

    const handleAddToCart = async (productId: string, label: string, price: number) => {
        const currentCartId = await getCartId();

        try {
            await addProductToCart(currentCartId, productId, label, price);
            getCart();
        } catch (error) {
            console.log(error);
        }
    };

    const getCart = async () => {
        if (user && user.uuid) {
            const currentCart = await getCartByUserId(user.uuid);

            if (currentCart === null || currentCart === undefined) {
                console.log("Aucun panier trouvé, création d'un nouveau panier");

                const newCart = await createCart(user.uuid);

                setCart(newCart as Cart);
            }
            console.log('Panier existant trouvé');
            console.log('curr cart', currentCart);

            setCart(currentCart as Cart);
        }
    };

    return (
        <div>
            <h1>Customer</h1>
            <div>
                {products &&
                    products.map((prod: Product) => (
                        <tr key={prod.id}>
                            <td>{prod.label}</td>
                            <td>{prod.price}</td>
                            <td>{prod.img}</td>
                            <td>
                                {cart && (
                                    <button
                                        onClick={() =>
                                            handleAddToCart(prod.id, prod.label, prod.price)
                                        }
                                    >
                                        {cart.product_id && cart.product_id.indexOf(prod.id) !== -1
                                            ? 'Done'
                                            : 'Add'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
            </div>
            <ProductPage />
        </div>
    );
}
