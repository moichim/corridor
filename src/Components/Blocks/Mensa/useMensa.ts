import { ApiResponse } from "@src/Types";
import { useApi } from "@src/Utils/ApiProvider/ApiProvider";
import Time from "@src/Utils/Time";
import { useQuery } from "@tanstack/react-query";

type MensaMealTypeBase = {
    name: string,
    number: number,
    allergens: {
        number: number,
        name: string,
        description: string
    }[]
}

export type MensaMealPriceType = {
    type: string,
    price: number
}

export type MensaMealTypeOriginal = MensaMealTypeBase & {
    prices: MensaMealPriceType[],
    type: "original"
}

export type MensaMealTypeAggregated = MensaMealTypeBase & {
    prices: {
        [index: string]: MensaMealPriceType[]
    },
    type: "aggregated"
}

export type MensaResponsePayload = {
    mainCourses: MensaMealTypeOriginal[],
    soups: {
        [index: string]: MensaMealTypeOriginal|MensaMealTypeAggregated
    },
    extra: string[]
}


const useMensa = (
    refreshFrequency:number = Time.minutes( 5 )
) => {

    const api = useApi();

    // const network = useNetwork();

    const query = useQuery<ApiResponse<MensaResponsePayload>>({
        queryKey: [ "mensa" ],
        queryFn: () => api.fetch( "/mensa" ),
        initialData: {
            success: false,
            payload: {
                mainCourses: [],
                soups: {},
                extra: []
            }
        } as ApiResponse<MensaResponsePayload>,
        refetchInterval: refreshFrequency,
        // enabled: network.online
        cacheTime: 0
    });

    const hasFood = Array.isArray( query.data.payload ) 
        ? false 
        : query.data.payload.mainCourses.length > 0 && Object.values( query.data.payload.soups ).length > 0;

    return {
        ...query,
        mensa: query.data.payload,
        hasFood
    };

}

export default useMensa;