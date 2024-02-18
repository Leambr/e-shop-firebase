import React from 'react';
import { Close } from '@mui/icons-material';
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Typography,
    useMediaQuery,
} from '@mui/material';
import s from './DashboardMenu.module.css';
import { useAuthContext } from '../../../context/AuthContext';

interface DashboardMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DashboardMenu = ({ isOpen, onClose }: DashboardMenuProps) => {
    const isMobile = useMediaQuery('(max-width: 720px)');
    const { user } = useAuthContext();
    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: { width: isMobile ? '100%' : 300 },
            }}
        >
            <Paper elevation={0}>
                <Box className={s.menuHeader}>
                    <div className={s.headerContent}>
                        <Typography variant="titleM">E-shop Menu</Typography>
                    </div>
                    
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: 'var(--color-neutral-900)',
                            alignItems: 'flex-start',
                            paddingTop: '0px',
                            display: isMobile ? 'flex' : 'none',
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>
                {user.role === 'customer' && (
                    <div className={s.listContainer}>
                        <List
                            sx={{
                                marginBottom: '32px',
                                padding: 0,
                            }}
                        >
                            <ListItem
                                sx={{
                                    padding: '0 0 0 24px',
                                    marginBottom: '4px',
                                }}
                            >
                                <Typography variant="badge" color={'grey'}>
                                    Products
                                </Typography>
                            </ListItem>
                            <ListItemButton
                                onClick={onClose}
                                href="/products"
                                sx={{
                                    padding: '12px 32px',
                                }}
                            >
                                Products
                            </ListItemButton>
                            <ListItemButton
                                onClick={onClose}
                                href="/cart"
                                sx={{
                                    padding: '12px 32px',
                                }}
                            >
                                Your cart
                            </ListItemButton>
                        </List>
                        <List
                            sx={{
                                marginBottom: '32px',
                                padding: 0,
                            }}
                        >
                            <ListItem
                                sx={{
                                    padding: '0 0 0 24px',
                                    marginBottom: '4px',
                                }}
                            >
                                <Typography variant="badge" color={'grey'}>
                                    Orders
                                </Typography>
                            </ListItem>
                            <ListItemButton
                                onClick={onClose}
                                //mettre la bonne route pour rediriger sur la bonne page
                                href="/orders"
                                sx={{
                                    padding: '12px 32px',
                                }}
                            >
                                See orders
                            </ListItemButton>
                        </List>
                    </div>
                )}

                {user.role === 'seller' && (
                    <div className={s.listContainer}>
                        <List
                            sx={{
                                marginBottom: '32px',
                                padding: 0,
                            }}
                        >
                            <ListItem
                                sx={{
                                    padding: '0 0 0 24px',
                                    marginBottom: '4px',
                                }}
                            >
                                <Typography variant="badge" color={'grey'}>
                                    Products
                                </Typography>
                            </ListItem>
                            <ListItemButton
                                onClick={onClose}
                                href="/products"
                                sx={{
                                    padding: '12px 32px',
                                }}
                            >
                                Products
                            </ListItemButton>
                        </List>
                    </div>
                )}
            </Paper>
 
        </Drawer>
    );
};
