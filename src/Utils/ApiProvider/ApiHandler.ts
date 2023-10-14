/**
 * Generates fetch requests on the local API
 * - creates root url
 * - handles all responses and converts them to JSON
 */
class ApiHandler {

    protected getApiRoot = () => "https://dev2-edu.labir.cz";//`${window.location.protocol}//${window.location.hostname}`;

    protected getAbsoluteUrl = ( url: string ) => `${this.getApiRoot()}${url}`;

    public async fetch<T extends Object>(
        url: string
    ):Promise<T> {
        return await fetch( this.getAbsoluteUrl( url ) ).then( response => {
            return response.json()
        } ) as T;
    }

    /** Performs a ping to the server in order to detect if it is online */
    public async ping(): Promise<boolean> {
        return await fetch( this.getAbsoluteUrl( "/home/ping" ) ).then( response => true ).catch( exception => false )
    }

}

export default ApiHandler;