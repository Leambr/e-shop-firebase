import React, { useState } from 'react';
import { ArrowDropDown, ArrowDropUp, ShoppingCart, ViewHeadline } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import s from './Navbar.module.css';
import { DashboardMenu } from './DashboardMenu/DashboardMenu';
import { UserMenu } from './UserMenu/UserMenu';

export default function Navbar() {
    const [displayLeftMenu, setDisplayLeftMenu] = useState(false);
    const [displayUserMenu, setDisplayUserMenu] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

    const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
        setDisplayUserMenu(true);
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <div className={s.burgerMenu} onClick={() => setDisplayLeftMenu(true)}>
                        <ViewHeadline />
                    </div>
                    <DashboardMenu
                        isOpen={displayLeftMenu}
                        onClose={() => setDisplayLeftMenu(false)}
                    />
                    <Typography variant="titleS">E-shop</Typography>
                    <div className={s.rightContainer}>
                        <IconButton color="inherit">
                            <ShoppingCart />
                        </IconButton>
                        <div className={s.userMenu} onClick={handleUserMenuClick}>
                            <Avatar />
                            {displayUserMenu ? (
                                <ArrowDropUp sx={{ margin: 1 }}> </ArrowDropUp>
                            ) : (
                                <ArrowDropDown sx={{ margin: 1 }}></ArrowDropDown>
                            )}
                        </div>
                        <UserMenu
                            isOpen={displayUserMenu}
                            anchorElement={userMenuAnchor}
                            onClose={() => setDisplayUserMenu(false)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
