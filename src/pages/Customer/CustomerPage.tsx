import { useAuthContext } from '../../context/AuthContext';
import { getAllProducts } from '../../services/productsService';
import {
    createBasket,
    getBasketByUserId,
    addProductToBasket,
    getBasketId,
} from '../../services/basketsService';
import { useEffect, useState } from 'react';
import ProductPage from '../Product/ProductPage';

interface Product {
    id: string;
    label: string;
    price: number;
    img?: string;
    seller_id?: string;
}
interface Basket {
    id: string;
    product_id: string[];
    status: string;
    userCustomerId: string;
}

export default function CustomerPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [basket, setBasket] = useState<Basket>();
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
            getBasket();
        }
    }, [user]);

    const handleAddToBasket = async (productId: string, label: string, price: number) => {
        const currentBasketId = await getBasketId();

        try {
            await addProductToBasket(currentBasketId, productId, label, price);
            getBasket();
        } catch (error) {
            console.log(error);
        }
    };

    const getBasket = async () => {
        if (user && user.uuid) {
            const currentBasket = await getBasketByUserId(user.uuid);

            if (currentBasket === null || currentBasket === undefined) {
                console.log("Aucun panier trouvé, création d'un nouveau panier");

                const newBasket = await createBasket(user.uuid);

                setBasket(newBasket as Basket);
            }
            console.log('Panier existant trouvé');
            console.log('curr basket', currentBasket);

            setBasket(currentBasket as Basket);
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
                                {basket && (
                                    <button
                                        onClick={() =>
                                            handleAddToBasket(prod.id, prod.label, prod.price)
                                        }
                                    >
                                        {basket.product_id &&
                                        basket.product_id.indexOf(prod.id) !== -1
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
