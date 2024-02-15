import React, { useState } from 'react';
import { ViewHeadline } from '@mui/icons-material';
import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';
import s from './Navbar.module.css';
import { DashboardMenu } from './DashboardMenu/DashboardMenu';

export default function Navbar() {
    const [displayLeftMenu, setDisplayLeftMenu] = useState(false);

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
                        <div className={s.userMenu}>
                            <Avatar alt="Billy Boy" />
                            {/* {displayUserMenu ? (
                                <ArrowDropUp sx={{ margin: 1 }}> </ArrowDropUp>
                            ) : (
                                <ArrowDropDown sx={{ margin: 1 }}></ArrowDropDown>
                            )} */}
                        </div>
                        {/* <UserMenu
                            isOpen={displayUserMenu}
                            anchorElement={userMenuAnchor}
                            fullName={userFullName}
                            avatar={userAvatar}
                            onClose={() => setDisplayUserMenu(false)}
                        /> */}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
