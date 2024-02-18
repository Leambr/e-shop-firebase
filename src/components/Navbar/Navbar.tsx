import React, { useState } from 'react';
import { ArrowDropDown, ArrowDropUp, ShoppingCart, ViewHeadline } from '@mui/icons-material';
import { AppBar, Avatar, IconButton, Link, Toolbar, Typography, styled } from '@mui/material';
import s from './Navbar.module.css';
import { DashboardMenu } from './DashboardMenu/DashboardMenu';
import { UserMenu } from './UserMenu/UserMenu';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Navbar() {
    const [displayLeftMenu, setDisplayLeftMenu] = useState(false);
    const [displayUserMenu, setDisplayUserMenu] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

    const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
        setDisplayUserMenu(true);
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <div className={s.burgerMenu} onClick={() => setDisplayLeftMenu(true)}>
                        <ViewHeadline />
                    </div>
                    <DashboardMenu
                        isOpen={displayLeftMenu}
                        onClose={() => setDisplayLeftMenu(false)}
                    />
                    <Typography variant="titleS">
                        <Link href="/homepage" color="inherit" underline="none">
                            E-shop
                        </Link>
                    </Typography>
                    <div className={s.rightContainer}>
                        <IconButton color="inherit" href="/cart">
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
            <Offset />
        </>
    );
}
