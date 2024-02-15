import React from 'react';
import { ViewHeadline } from '@mui/icons-material';
import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';
import s from './Navbar.module.css';

export default function Navbar() {
    // const [displayLeftMenu, setDisplayLeftMenu] = useState(false);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense" className={s.navbar}>
                    <div className={s.burgerMenu}>
                        <ViewHeadline />
                    </div>
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
