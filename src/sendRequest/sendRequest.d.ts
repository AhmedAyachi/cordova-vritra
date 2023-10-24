

export default function sendRequest(
    url:string,
    options:{
        method:string,
        headers:Object,
        body:any,
        /**
         * @default 3000
         */
        timeout:number,
    },
):Promise<Response>;
