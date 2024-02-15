import { createTheme } from '@mui/material';

export const theme = createTheme({
    shape: {
        borderRadius: 4,
    },
    spacing: 4,
    components: {
        MuiToolbar: {
            styleOverrides: {
                dense: {
                    height: 56,
                    minHeight: 56,
                },
            },
        },
        // MuiDivider: {
        //     styleOverrides: {
        //         root: {
        //             margin: 0,
        //         },
        //     },
        // },
        // MuiMenu: {
        //     styleOverrides: {
        //         list: {
        //             padding: 0,
        //         },
        //     },
        // },
        // MuiMenuItem: {
        //     styleOverrides: {
        //         divider: {
        //             paddingTop: 12,
        //             paddingBottom: 12,
        //         },
        //     },
        // },
    },
});
