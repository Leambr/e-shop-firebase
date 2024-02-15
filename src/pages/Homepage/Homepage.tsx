import CustomerPage from '../Customer/CustomerPage';
import SellerPage from '../Seller/SellerPage';
import { useAuthContext } from '../../context/AuthContext';

export default function Homepage() {
    const { user } = useAuthContext();

    return <div>{user?.role === 'seller' ? <SellerPage /> : <CustomerPage />}</div>;
}
