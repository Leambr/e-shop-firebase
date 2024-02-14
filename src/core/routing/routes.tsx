import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../../layout/layout';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import Homepage from '../../components/Homepage/Homepage';

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
                path: '/sign-up',
                element: <SignUp />,
            },
            {
                path: '/homepage',
                element: <Homepage />,
            },
        ],
    },
]);
