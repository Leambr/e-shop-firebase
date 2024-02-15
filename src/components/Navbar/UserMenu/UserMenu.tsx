import React, { ReactElement } from 'react';
import { LogoutOutlined } from '@mui/icons-material';
import { Avatar, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import { useAuthContext } from '../../../context/AuthContext';

import s from './UserMenu.module.css';

interface UserMenuProps {
    isOpen: boolean;
    anchorElement: HTMLElement | null;

    onClose: () => void;
}

export const UserMenu = ({ isOpen, anchorElement, onClose }: UserMenuProps): ReactElement => {
    const { Logout, user } = useAuthContext();

    return (
        <Menu anchorEl={anchorElement} open={isOpen} onClose={onClose} onClick={onClose}>
            <div className={s.menuContainer}>
                <ListItem divider={true} className={s.menuHeader}>
                    <Avatar />
                    <Typography variant="titleS">{user.email}</Typography>
                </ListItem>
                <MenuItem sx={{ gap: 6 }} onClick={Logout}>
                    <LogoutOutlined />
                    Log out
                </MenuItem>
            </div>
        </Menu>
    );
};
