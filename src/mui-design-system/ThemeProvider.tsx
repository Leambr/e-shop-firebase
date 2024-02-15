import { createTheme } from '@mui/material';

export const theme = createTheme({
    typography: {
        fontFamily: 'var( --sans-serif)',
        button: {
            textTransform: 'none',
        },
        titleXL: {
            fontSize: '2rem',
            fontWeight: 800,
            lineHeight: 1.235,
        },
        titleL: {
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '2rem',
        },
        titleM: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: '1.75rem',
        },
        titleS: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: '1.5rem',
        },
        badge: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: '1.25rem',
        },
        annotation: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.25rem',
        },
        caption: {
            lineHeight: '1rem',
        },
    },

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
