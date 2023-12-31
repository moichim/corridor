import React from "react";
import Time from "../../../Utils/Time";
import Block, { BlockType } from "../../UI/Containers/Block";
import CalendarDay from "./CalendarDay";
import useCalendar, { CalendarEvent } from "./useCalendar";


type CalendarProps = BlockType & {
    refetchInterval: number
};

/**
 * Calendar component
 */
const Calendar: React.FC<CalendarProps> = ({
    label,
    description,
    refetchInterval = Time.minutes(5),
    ...props
}) => {

    const calendar = useCalendar( refetchInterval);

    return <Block
        label={label}
        description={description}
        {...props}
        loading={calendar.isFetching}
    >
        {Object.entries<CalendarEvent[]>(calendar.events).map(([day, events]:[string,CalendarEvent[]]) => {

            return <CalendarDay key={day} events={events} day={day}/>;

        })}
    </Block>
}

export default Calendar;


