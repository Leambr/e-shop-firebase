import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export default function SellerPage() {
    const navigate = useNavigate();
    const { Logout } = useAuthContext();
    
    const handleLogout = async () => {
        try {
          await Logout();
          navigate('/sign-in');
        } catch (e) {
          console.log(e);
        }
      };

    return <div >
         <h1>Seller</h1>
         <button onClick={handleLogout}>logout</button>
    </div>;
}
