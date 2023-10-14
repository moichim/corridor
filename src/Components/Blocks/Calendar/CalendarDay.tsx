import React from "react";
import { Grid } from "@mui/material";
import { CalendarEvent } from "./useCalendar";
import PaperExtended from "../../UI/Containers/PaperExtended";
import CalendarEventItem from "./CalendarEvent";

type CalendarDayProps = {
    day: string,
    events: CalendarEvent[]
}

// A single calendar day
const CalendarDay: React.FC< CalendarDayProps > = ( props ) => {

    return <Grid
        container
        sx={ {marginBottom: 2.5} }
    >

        <Grid 
            item
            xs={3}
            md={3}
        >
            <PaperExtended scheme="main" sx={{marginRight: 1}} >
                {props.day}
            </PaperExtended>
        </Grid>


        <Grid item xs={9} md={9}>

            {props.events.map( event => <CalendarEventItem key={event.id} {...event} /> )}

        </Grid>

    </Grid>

}

export default CalendarDay;