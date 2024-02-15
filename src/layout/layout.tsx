import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { theme } from '../mui-design-system/ThemeProvider';
import { CssBaseline } from '@mui/material';

export const Layout = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <>
                <Outlet />
            </>
        </ThemeProvider>
    );
};
