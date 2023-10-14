import { createTheme, ThemeProvider } from "@mui/material";
import React, { PropsWithChildren } from "react";



const MuiThemeProvider: React.FC<PropsWithChildren> = ( props ) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#730347",
                dark: "#45062c",
                light: "#e887a1"
            }
        },
        shape: {
            borderRadius: 20,
        },
        typography: {
            h1: {
                fontSize: "8rem"
            },
            h2: {
                fontSize: "4.7rem"
            },
            caption: {
                fontSize: "0.85rem"
            },
            overline: {
                lineHeight: ".8rem",
                fontSize: ".8rem"
            }
        },
        components: {
            MuiCard: {
                defaultProps: {
                    color: "blue",
                },
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent",
                        color: "white",
                        // borderColor: "red"
                    }
                }
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        borderColor: "blue"
                    }
                }
            },
    
        }
    });

    theme.typography.h1 = {
        fontSize: "4rem",
        fontWeight: 300,
        lineHeight: 1,
        [theme.breakpoints.up('md')]: {
            fontSize: '6rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '8rem',
        },
    }

    theme.typography.h2 = {
        fontSize: "2rem",
        fontWeight: 300,
        lineHeight: 1,
        [theme.breakpoints.up('md')]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '4.7rem',
        },
    }

    theme.typography.h5 = {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1,
        [theme.breakpoints.up('md')]: {
            fontSize: '1.3rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '1.5rem',
        },
    }

    return (
        <ThemeProvider theme={ theme }>
            {props.children}
        </ThemeProvider>
    );

}

export default MuiThemeProvider;