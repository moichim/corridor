import { Grid } from "@mui/material";
import React from "react";

const PageRow: React.FC<React.PropsWithChildren> = props => {
    return <Grid 
            container 
            columnSpacing={3}
            alignItems={"stretch"}
            sx={{
                height: "50%",
                overflow: "hidden"
            }}
        >{props.children}</Grid>
}

export default PageRow;