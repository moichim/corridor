import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ApiResponse, ErrorPayload } from "../../../Types";
import { useApi } from "../../../Utils/ApiProvider/ApiProvider";
import Time from "../../../Utils/Time";

export interface ArticleItemType {
    title: string,
    description?: string,
    date: number,
    link?: string,
    image?: string,
    [index:string]: any,
    source: ArticleSourceDefinition,
    id: string
}

export type ArticleSourceDefinition = {
    domain: string,
    icon?: string,
    type: string,
    color?: string,
    categories?: number[]
}

type ArticleResponseType = { 
    hash: string,
    entries: ArticleItemType[]
}

const formatDescription = (current: number, total: number) => {
    return total > 0
    ? ` ${current + 1} / ${total}`
    : "Načítám."
}

const copyEntryByIndex = ( index: number, entries: ArticleItemType[] ) => {
    return entries[ index ] 
    ? JSON.parse( JSON.stringify( entries[ index ] ) )
    : null
}


const useArticles = (
    apiRoute: string,
    refreshFrequency: number = Time.minutes(10),
    rotationFrequency: number = Time.seconds(5)
) => {

    const api = useApi();

    const query = useQuery<ApiResponse<ArticleResponseType>, ErrorPayload>({
        queryKey: ["articles", apiRoute],
        queryFn: () => api.fetch(apiRoute),
        initialData: {
            success: false,
            payload: {
                hash: "",
                entries: []
            }
        } as ApiResponse<ArticleResponseType>,
        refetchInterval: refreshFrequency,
        // enabled: network.online
        cacheTime: 0
    });


    const [
        currentIndex,
        setCurrentIndex
    ] = useState<number>(0);

    const [tick, setTick] = useState<boolean>( false );

    const [ description, setDescription ] = useState<string>("Načítám");
    const [ currentEntry, setCurrentEntry ] = useState<ArticleItemType|null>( null );


    // Rotate the current index
    useEffect( () => {

        const doRotate = () => {

            setTick( previousTick => ! previousTick );

            // Rotate the index anytime
            setCurrentIndex( currentIndexValue => {
                if ( currentIndexValue + 1 > query.data.payload.entries.length - 1 ) return 0;
                return currentIndexValue + 1;
            } );
    
        }

        const timeout = setTimeout( doRotate, rotationFrequency );

        return () => clearTimeout( timeout );

    }, [ tick, query.data.payload.hash, query.data.payload.entries.length, rotationFrequency ] );


    useEffect( () => {

        const currentEntries = query.data.payload.entries;

        setCurrentEntry( copyEntryByIndex( currentIndex, currentEntries ) );

        setDescription( formatDescription( currentIndex, currentEntries.length ) );

    }, [ currentIndex, query.data.payload.hash, query.data.payload.entries ] );

    



    return {
        ...query,
        current: currentEntry,
        description
    };


}

export default useArticles;