import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { theme } from '../mui-design-system/ThemeProvider';
import { Container, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import { useAuthContext } from '../context/AuthContext';

export const Layout = () => {
    const { isLogged } = useAuthContext();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <>
                {isLogged && <Navbar />}
                <Container maxWidth="md">
                    <Outlet />
                </Container>
            </>
        </ThemeProvider>
    );
};
