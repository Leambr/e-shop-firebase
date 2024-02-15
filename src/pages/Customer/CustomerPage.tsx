import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { getAllProducts } from '../../services/productsService';
import { createBasket, getBasketById, addProductToBasket } from '../../services/basketsService';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  label: string;
  price: string;
  img: string;
}
interface Basket {
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
    const basketId = "38qnH0QxJc3nYrnkeANo";
    
    useEffect(() => {

      const fetchProducts = async () => {
        try {
          const allProducts = await getAllProducts();
          setProducts(allProducts); 

        } catch (error) {
          console.error("Erreur lors de la récupération des produits :", error);
        }
      };
      getBasket()
      fetchProducts();
      console.log("new --->", basket);
      
    }, []);

    const handleAddToBasket = async (bid: string, pid:string) => {
        try {
          await addProductToBasket(bid, pid) 
          getBasket()
        } catch (error) {
          console.log(error);
        }
    }

    const getBasket = async () => {

      
      // a decommenter quand basketContext est set

      // if (basketId == null) {
      //   console.log("basketnull");
        
      //   const newBasket = await createBasket(user.uuid)

      //   setBasket(newBasket)
      // }
      const currentBasket = await getBasketById(basketId)
      console.log("current --->",currentBasket);
      
      setBasket(currentBasket as Basket)
    }

    const handleLogout = async () => {
        try {
          await Logout();
          navigate('/sign-in');
        } catch (e) {
          console.log(e);
        }
      };

    return <div >
         <h1>Customer</h1>
          <div>
          {products && products.map((prod: Product) => (
                                <tr key={prod.id}>
                                    <td>{prod.label}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.img}</td>
                                    <td>
                                        <button onClick={() => handleAddToBasket(basketId, prod.id)}>{basket.product_id != undefined && basket.product_id.indexOf(prod.id) != -1 ? "Done" : "Add"}</button>
                                    </td>
                                </tr>
                            ))}
          </div>
         <button onClick={handleLogout}>logout</button>

    </div>;
}
