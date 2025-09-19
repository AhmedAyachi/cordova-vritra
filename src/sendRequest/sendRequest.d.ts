

export default function sendRequest(
    url:string,
    options?:{
        /**
         * @default "GET"
         */
        method?:string,
        headers?:[string:any],
        /**
         * for non-string values, the body is stringified.
         */
        body?:[string:any],
        /**
         * Url search params
         */
        searchParams?:[string:any],
        /**
         * In milliseconds
         * @default 3000
         * @notice pass 0 to disable the timeout.
         */
        timeout?:number,
        /**
         * @default false
         */
        withCredentials?:boolean,
        /**
         * @deprecated use withCredentials instead
         * @default false
         */
        credentials?:boolean,
    },
):Promise<Response>;
