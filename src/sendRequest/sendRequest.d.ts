

export default function sendRequest(
    url:string,
    options:{
        method:string,
        headers:Object,
        /**
         * for non-string values, the body is stringified.
         */
        body:any,
        /**
         * In milliseconds
         * @default 3000
         * @notice pass 0 to disable the timeout.
         */
        timeout:number,
        /**
         * @default false
         */
        credentials:boolean,
    },
):Promise<Response>;
