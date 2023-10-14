// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, createContext, useContext, useMemo } from "react";
import ApiHandler from "./ApiHandler"

const queryClient = new QueryClient();

type ApiContextType = {
    handler: ApiHandler,
    fetch: <T extends Object>( url: string ) => Promise<T>
};

const handler = new ApiHandler();

const ApiContext = createContext<ApiContextType>( {
    handler: handler,
    fetch: handler.fetch
} );

const ApiProvider: React.FC<PropsWithChildren> = ( props ) => {

    const api = useMemo( () => new ApiHandler(), [] );

    return <QueryClientProvider client={queryClient}>
        <ApiContext.Provider value={{
            handler: api,
            fetch: api.fetch.bind( api )
        }}>
            {props.children}
        </ApiContext.Provider>
    </QueryClientProvider>
}

// export default ApiProvider;

const useApi = () => {
    return useContext( ApiContext );
}

export {
    useApi,
    ApiProvider
}