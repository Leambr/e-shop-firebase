import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerPage from '../Customer/CustomerPage'

export default function Homepage() {
    const navigate = useNavigate();

    const [role, setRole] = useState<string | null>();
    const [token, setToken] = useState<string  | null>();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token && !role) {
            navigate('/sign-in');
            return 
        }
        setToken(token)
        setRole(role)
    }, []);

    // Continue with the rest of the code for the Homepage component
    return <div >
        {role == "seller" ? (
            <h1>Seller</h1>
        ) : role == "customer" ? (
          
            <CustomerPage />
        ) : (
            <h1>Rien</h1>
        )}
    </div>;
}
