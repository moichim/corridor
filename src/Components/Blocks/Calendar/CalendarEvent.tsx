import React, { PropsWithChildren, useMemo } from "react";
import { CalendarEvent } from "./useCalendar";
import { Box, Grid, GridProps, SxProps, Typography, useTheme } from "@mui/material";
import Time from "../../../Utils/Time";

import { LocationOn, Info } from '@mui/icons-material';
import PaperExtended, { PaperSchemeVariant } from "../../UI/Containers/PaperExtended";

// A calendar cell
const CalendarCell: React.FC<PropsWithChildren & GridProps & {
    paperSx?: SxProps;
    scheme?: PaperSchemeVariant
}> = ({
    children, 
    paperSx = {},
    scheme = "main",
    ...props
}) => {
        return <Grid item {...props}>
            <PaperExtended
                scheme={ scheme }
                sx={{
                    marginBottom: 1,
                    ...paperSx
                }}
            >{children}</PaperExtended>
        </Grid>;
    };

// A single CalendarEventItem detail
const CalendarEventDetail: React.FC<{label: string, icon: typeof LocationOn | typeof Info }> = (props) => {

    const theme = useTheme();

    const IconElement = props.icon;

    return <Box>
        <Typography
            sx={{
                fontSize: 12,
                color: theme.palette.primary[ "light" ]
            }}
        >
            <IconElement sx={{fontSize: "10px"}}/>
            {props.label}
        </Typography>
    </Box>
}

// A single calendar event (nested in CalendarDay)
const CalendarEventItem: React.FC< CalendarEvent > = props => {

    // Format the event time
    const time = useMemo( () => {
        return Time.formatTime( new Date( props.from * 1000 ) )
    }, [ props.from ] );

    return <Box>
        <Grid container>

            <CalendarCell 
                scheme="dark"
                paperSx={{
                    color: "primary.light",
                    marginRight: 1
                }}
            >
                {time}
            </CalendarCell>
            
            <CalendarCell
            paperSx={{
                maxWidth: 220
            }}>

                <b>{props.name}</b>

                {props.location && <CalendarEventDetail label={props.location} icon={LocationOn}/>}
                
                {props.calendar.name && <CalendarEventDetail label={props.calendar.name} icon={Info}/>}

            </CalendarCell>

        </Grid>
    </Box>

}

export default CalendarEventItem;