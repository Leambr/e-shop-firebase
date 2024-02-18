import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../../layout/layout';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import ProtectedRoute from '../ProtectedRoute';
import Homepage from '../../pages/Homepage/Homepage';
import ProductPage from '../../pages/Product/ProductPage';
import ShoppingCartPage from '../../pages/ShoppingCart/ShoppingCartPage';
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
                element: (
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/homepage',
                element: (
                    <ProtectedRoute>
                        <Homepage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'products',
                element: (
                    <ProtectedRoute>
                        <ProductPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'cart',
                element: (
                    <ProtectedRoute>
                        <ShoppingCartPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
