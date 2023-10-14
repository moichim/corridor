import { CssBaseline } from "@mui/material";
import React from "react";
import { ApiProvider } from "../Utils/ApiProvider/ApiProvider";
import MuiThemeProvider from "../Utils/Theming/ThemeProvider";

const Providers: React.FC<React.PropsWithChildren> = ( props ) => {
    
    return <ApiProvider>
        <MuiThemeProvider>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    </ApiProvider>;

}

export default Providers;