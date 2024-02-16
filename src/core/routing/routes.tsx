import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../../layout/layout';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import ProtectedRoute from '../ProtectedRoute';
import Homepage from '../../pages/Homepage/Homepage';
import Orders from '../../pages/Orders/Orders';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <SignIn />,
            },
            {
                path: '/sign-in',
                element: <SignIn />,
            },
            {
                path: '/seller/sign-up',
                element: <SignUp role="Seller" />,
            },
            {
                path: '/customer/sign-up',
                element: <SignUp role="Customer" />,
            },
            {
                path: '/orders',
                element: <Orders />,
            },
            {
                path: '/homepage',
                element: (
                    <Homepage />
                    // <ProtectedRoute>
                    //     <Homepage />
                    // </ProtectedRoute>
                ),
            },
        ],
    },
]);
