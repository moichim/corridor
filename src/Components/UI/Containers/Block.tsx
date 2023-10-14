import { CircularProgress, Grid, GridProps, Typography, useTheme } from "@mui/material";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { CSSProperties, useMemo } from "react";

/**
 * A block is basically a Grid item
 * - should include dimensions such as `xs` and `md`
 */
export interface BlockType extends React.PropsWithChildren, GridProps {
    label?: string,
    description?: string,
    loading?: boolean
};

/**
 * An unique handler for all blocks
 * - label & description
 * - content as children
 * - handles loading indicator
 */
const Block:React.FC<BlockType> = ( {
    label, 
    description,
    children,
    loading = false,
    ...props
} ) => {

    const theme = useTheme();

    const size = useWindowSize();

    const { sx, ...cellProps } = props;

    // Cell styles are calculated once (depending on props)
    const additionalCss: CSSProperties = useMemo( () => {

        let styles: CSSProperties = {};

        if ( size.width! > 900 ) {
            styles.maskImage = "linear-gradient(to bottom, black 90%, transparent 100%)";
            styles.maxHeight = "100%";
        }
        else {
            styles.marginTop = "1rem";
        }

        return styles;

    }, [size.width] );

    

    return <Grid item {...cellProps} sx={sx} style={additionalCss}>
        <Grid container columnSpacing={1} sx={{
                justifyContent: "flex-start",
                alignItems: "center"
            }}>
            <Grid item>
                <Typography 
                    variant="overline" 
                    display="block" 
                    gutterBottom
                    sx={{
                        color: theme.palette.primary["light"],
                        marginBottom: 1
                    }}
                >
                    {label}
                </Typography>
            </Grid>
            {loading ? <Grid item><CircularProgress size={20} sx={{color: "white", opacity: 1}}/></Grid>: null }
        </Grid>
        <Grid item sx={{
            position: "relative",
            height: "100%",
            boxSizing: "border-box"
        }}>
            {children}
            { description && <Typography 
                    variant="caption" 
                    display="block" 
                    sx={{
                        color: theme.palette.primary["light"],
                        marginTop: 1
                    }}
                >
                    {description}
                </Typography> }
        </Grid>
        
    </Grid>

}

export default Block;