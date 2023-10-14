import { ApiResponse } from "@src/Types";
import { useApi } from "@src/Utils/ApiProvider/ApiProvider";
import Time from "@src/Utils/Time";
import { useQuery } from "@tanstack/react-query";

export type MeteoEntryType = {
    time: number,
    source: string,
    isForecast: boolean,
    temperature: number,
    bar: number,
    uv: number,
    humidity: number,
    rain: number,
    wind: {
        speed: number,
        dir: string
    }
}

export type MeteoSerie = {
    name: string,
    color: string,
    entries: {
        [index: string]: MeteoEntryType
    }
}

export type MeteoResponse = {
    [index: string]: MeteoSerie
}

const defaultResponse: ApiResponse<MeteoResponse> = {
    success: false,
    payload: {}
}


const useMeteo = (
    refreshFrequency: number = Time.minutes(30)
) => {

    const api = useApi();

    const query = useQuery<ApiResponse<MeteoResponse>>({
        queryKey: ["meteo"],
        queryFn: () => api.fetch( "/meteo" ),
        initialData: defaultResponse,
        cacheTime: 0,
        refetchInterval: refreshFrequency
    });

    const tick = "meteo" in query.data.payload
        ? {
            min: Object.values( query.data.payload["meteo"].entries )
            .reduce( ( state, current ) => {
                if ( current.time < state ) return current.time;
                return state;
            }, Infinity ),
            max: Object.values( query.data.payload["meteo"].entries )
            .reduce( ( state, current ) => {
                if ( current.time > state ) return current.time;
                return state;
            }, -Infinity ),
        }
        : {};

    const victory: VictoryGroup[] = Object.values( query.data.payload ).map( response => ({
        color: response.color,
        name: response.name,
        data: Object.values( response.entries ).map( entry => ({
            x: entry.time,
            y: entry.temperature
        }) )
    }) );

    

    return {
        ...query,
        victory,
        tick
    }

}

export default useMeteo;

type VictoryGroup = {
    color: string,
    name: string,
    data: {x:number,y:number}[]
}