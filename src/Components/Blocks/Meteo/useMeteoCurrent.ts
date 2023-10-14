import { ApiResponse } from "@src/Types";
import { useApi } from "@src/Utils/ApiProvider/ApiProvider";
import Time from "@src/Utils/Time";
import { useQuery } from "@tanstack/react-query";
import { MeteoEntryType } from "./useMeteo";


const useMeteoCurrent = (
    refreshFrequency: number = Time.minutes( 2 )
) => {

    const api = useApi();

    const query = useQuery<ApiResponse<MeteoEntryType>>({
        queryKey: ["currentMeteo"],
        queryFn: () => api.fetch( "/meteo/current" ),
        cacheTime: 0,
        refetchInterval: refreshFrequency,
        initialData: {
            success: false,
            payload: {}
        } as ApiResponse<MeteoEntryType>
    });

    return {
        ...query
    };

}

export default useMeteoCurrent;