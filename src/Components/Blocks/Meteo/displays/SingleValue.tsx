import { Box, Grid, Typography, useTheme } from "@mui/material"
import PaperExtended from "@src/Components/UI/Containers/PaperExtended"
import React from "react"

type SingleValueProps = React.PropsWithChildren & {
    label: string | React.ReactNode,
    value: string,
    unit: string,
    icon: React.ReactNode
}

const directions: { [index: string]: number } = {
    N: 0,
    NEN: 22,
    NE: 45,
    NEE: 67,
    E: 90,
    SEE: 112,
    SE: 135,
    SES: 157,
    S: 180,
    SWS: 202,
    SW: 225,
    SWW: 247,
    W: 270,
    NWW: 292,
    NW: 315,
    NWN: 337,
}

const SingleValue: React.FC<SingleValueProps> = props => {

    const theme = useTheme();


    const rotation = Object.keys(directions).includes(props.value)
        ? directions[props.value]
        : undefined;

    const transform = rotation
        ? `rotate(${rotation}deg)`
        : undefined;

    return (
        <Grid item xs={4} sm={2} md={6} xl={4}>
            <PaperExtended scheme="inverse" >
                <Box>
                    <Typography
                        gutterBottom
                        sx={{
                            color: theme.palette.primary["light"],
                            display: "inline-block"
                        }}
                        style={{
                            transform: transform,
                        }}
                    >
                        {props.icon}
                    </Typography>
                    <Typography
                        variant="h5"
                    >
                        {props.value} {props.unit}
                    </Typography>
                    <Typography
                        variant="overline"
                        sx={{
                            color: theme.palette.primary["light"]
                        }}
                    >{props.label}</Typography>

                </Box>
            </PaperExtended>
        </Grid>
    );

}

export default SingleValue;