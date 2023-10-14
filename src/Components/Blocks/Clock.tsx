import { Box, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Time from "../../Utils/Time";
import Block, { BlockType } from "../UI/Containers/Block";
const DAYS = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];



/**
 * The clock and current date
 */
const Clock: React.FC<BlockType> = ({
    xs = 12,
    md = 6,
    ...props
}) => {

    const theme = useTheme();

    const [clock,setClock] = useState<boolean>(true);

    const [ dateObject, setDateObject ] = useState<Date>( new Date() );

    useEffect( () => {

        // Change the clock

        // Set the new clock object
        const timeout = setTimeout( () => {
            setDateObject( new Date() );
            setClock( pastClock => ! pastClock );
        }, Time.minutes(1) );

        return () => clearTimeout( timeout );

    }, [clock] );

    const date: string = Time.formatDateFull( dateObject );
    const dayOfTheWeek: string = DAYS[ dateObject.getDay() ];
    const hoursAndMinutes: string = format( dateObject, "HH:mm" );

    return <Block
        label=" "
        xs={xs}
        md={md}
        {...props}
        sx={{
            alignSelf: "flex-end"
        }}
    >
        <Box sx={{ color: "white" }}>

            <Typography variant="h2" sx={{ color: theme.palette.primary["light"] }}>{dayOfTheWeek}</Typography>

            <Typography variant="h2" sx={{ color: theme.palette.primary["light"] }}>{date}</Typography>

            <Typography sx={{ display: "inline-block" }} variant="h1">{hoursAndMinutes}</Typography>

        </Box>

    </Block>
}

export default Clock;