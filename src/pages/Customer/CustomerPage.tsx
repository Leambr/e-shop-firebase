import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { getAllProducts } from '../../services/productsService';
import { createBasket, getBasketByUserId, addProductToBasket } from '../../services/basketsService';
import { useEffect, useState } from 'react';

interface Product {
    id: string;
    label?: string;
    price?: string;
    img?: string;
}
interface Basket {
    id: string;
    productId: string[];
    status: string;
    userCustomerId: string;
}

export default function CustomerPage() {
    const navigate = useNavigate();
    const { Logout } = useAuthContext();
    const [products, setProducts] = useState<Product[]>([]);
    const [basket, setBasket] = useState<Basket | null>();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getAllProducts();
                setProducts(allProducts);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits :', error);
            }
        };

        fetchProducts();
        if (user && user.uuid) {
            getBasket();
        }
    }, [user]);

    const handleAddToBasket = async (bid: string, pid: string) => {
        console.log(bid, pid);
        try {
            await addProductToBasket(bid, pid);
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
            setBasket(currentBasket as Basket);
        }
    };

    const handleLogout = async () => {
        try {
            await Logout();
            navigate('/sign-in');
        } catch (e) {
            console.log(e);
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
                                <button
                                    onClick={() => handleAddToBasket(basket?.id ?? '', prod.id)}
                                >
                                    {basket &&
                                    basket.productId &&
                                    basket.productId.indexOf(prod.id) !== -1
                                        ? 'Done'
                                        : 'Add'}
                                </button>
                            </td>
                        </tr>
                    ))}
            </div>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
}
