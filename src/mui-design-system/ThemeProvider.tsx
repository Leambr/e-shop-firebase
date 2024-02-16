import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#265669',
            main: '#183642',
        },
    },
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
    },
});
