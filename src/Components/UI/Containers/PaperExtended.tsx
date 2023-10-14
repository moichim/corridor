import { Box, PaletteColor, SxProps } from "@mui/material";
import React, { PropsWithChildren } from "react";

type AvailableColor = "black" | "white" | keyof PaletteColor;

type PaperExtendedProps = PropsWithChildren & {
    scheme?: PaperSchemeVariant
    padding?: number,
    sx?: SxProps
}

type Scheme = {
    information?: AvailableColor,
    background?: AvailableColor,
    outline?: AvailableColor,
    outlineStyle?: "solid" | "dashed" | "dotted",
    borderWidth?: string
}



const PaperExtendedSchemes: {
    minor: Scheme,
    // default: Scheme,
    main: Scheme,
    light: Scheme,
    dark: Scheme,
    inverse: Scheme
} = {
    main: {
        information: "white",
        outline: "main",
    },
    light: {
        information: "white",
        outline: "light",
    },
    dark: {
        information: "white",
        outline: "dark",
    },
    minor: {
        information: "white",
        outline: "main",
        outlineStyle: "dashed"
    },
    inverse: {
        information: "white",
        background: "dark"
    }
}

export type PaperSchemeVariant = keyof typeof PaperExtendedSchemes; 

const getSchemaColor = ( color: AvailableColor ): string => {

    if ( color === "black" || color === "white" )
        return color;

    return `primary.${color}`;

}

const getSchemaProps = ( schema: PaperSchemeVariant ): SxProps => {

    const sx: any = {
        boxSizing: "border-box",
        overflow: "hidden"
    };

    const values = PaperExtendedSchemes[ schema ];

    if ( "information" in values )
        sx.color = getSchemaColor( values!.information! );

    if ( "outline" in values ) {
        sx.borderColor = getSchemaColor( values!.outline! );
        sx.borderStyle = values.outlineStyle ?? "solid";
        sx.borderWidth = values.borderWidth ?? "2px";
    }

    if ( "background" in values )
        sx.backgroundColor = getSchemaColor( values.background! );

    return sx as SxProps;

}

const PaperExtended: React.FC<PaperExtendedProps> = ( {
    scheme = "main",
    padding = 1,
    children,
    sx = {},
    ...props
} ) => {

    const sxBase = {
        ...getSchemaProps( scheme ),
        ...sx,
    }

    return <Box
        sx={ sxBase }
        padding={padding}
        borderRadius={1}
    >{ children }</Box>

}

export default PaperExtended;