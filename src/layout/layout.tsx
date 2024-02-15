import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Outlet, useLocation } from 'react-router-dom';
import { theme } from '../mui-design-system/ThemeProvider';
import { Container, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';

export const Layout = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    const shouldDisplayNavbar =
        token &&
        location.pathname !== '/seller/sign-up' &&
        location.pathname !== '/customer/sign-up' &&
        location.pathname !== '/' &&
        location.pathname !== '/sign-in';
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <>
                {shouldDisplayNavbar && <Navbar />}
                <Container maxWidth="md">
                    <Outlet />
                </Container>
            </>
        </ThemeProvider>
    );
};
