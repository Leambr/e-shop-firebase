import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerPage from '../Customer/CustomerPage'
import SellerPage from '../Seller/SellerPage';
import { useAuthContext } from '../../context/AuthContext';

export default function Homepage() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/sign-in');
            return 
        }
    }, []);

    return (
        <div>
            {user?.role === 'seller' ? (
                <SellerPage />
            ) : (
                <CustomerPage />
            )}
        </div>
    );
}
