import { ApiResponse } from "../../../Types";
import { useApi } from "../../../Utils/ApiProvider/ApiProvider";
import Time from "../../../Utils/Time";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export type CalendarEvent = {
    name: string,
    from: number,
    to: number,
    id: string,
    location: string|null,
    calendar: {
        url: string,
        name?: string,
        color?: string
    }
}

type CalendarPayload = {
    [ index: string ]: CalendarEvent[]
}

const useCalendar = (
    refetchInterval: number = Time.minutes(5)
) => {

    const api = useApi();

    const query = useQuery<ApiResponse<CalendarPayload>>({
        queryKey: [ "calendar" ],
        queryFn: () => api.fetch( "/calendar" ),
        initialData: {
            success: false,
            payload: {}
        },
        refetchInterval: refetchInterval,
        cacheTime: 0
    });

    // Remove duplicite events from the calendar if there are any
    const uniqueEvents = useMemo( () => {
        
        const eventEntries = Object.entries( query.data.payload ).map( ( [ day, events ] ) => {

            const IDs: string[] = [];
            return [ day, events.filter( e => {
                if ( IDs.includes( e.id ) ) 
                    return false;
                IDs.push( e.id );
                return true;
            } ) ];

        } );

        return Object.fromEntries( eventEntries ) as CalendarPayload;

    }, [ query.data.payload ] );

    return {
        ...query,
        events: uniqueEvents
    }

}

export default useCalendar;