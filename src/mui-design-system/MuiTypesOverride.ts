import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
    export interface TypographyVariants {
        titleXL: CSSProperties;
        titleL: CSSProperties;
        titleM: CSSProperties;
        titleS: CSSProperties;
        badge: CSSProperties;
        annotation: CSSProperties;
    }

    // allow configuration using `createTheme`
    export interface TypographyVariantsOptions {
        titleXL?: CSSProperties;
        titleL?: CSSProperties;
        titleM?: CSSProperties;
        titleS?: CSSProperties;
        badge?: CSSProperties;
        annotation?: CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    export interface TypographyPropsVariantOverrides {
        titleXL: true;
        titleL: true;
        titleM: true;
        titleS: true;
        badge: true;
        annotation: true;
    }
}

declare module '@mui/material/TableCell' {
    export interface TableCellPropsVariantOverrides {
        titleS: true;
    }
}
