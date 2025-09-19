

export default (url,options)=>new Promise((resolve,reject)=>{
    const {method,headers,body,searchParams,timeout=3000}=options||{};
    const request=new XMLHttpRequest();
    request.withCredentials=Boolean(options.withCredentials||options.credentials);
    const requestUrl=new URL(url);
    if(searchParams) for(const key in searchParams){
        requestUrl.searchParams.set(key,searchParams[key]);
    }
    request.open(method||"GET",requestUrl);
    for(const key in headers){
        request.setRequestHeader(key,headers[key]);
    };
    request.onreadystatechange=()=>{
        if(request.readyState===XMLHttpRequest.DONE){
            const response=new Response(request.responseText);
            resolve(response);
        }
    };
    request.onerror=()=>{
        reject(new Error("Network error or request blocked"));
    };
    if(timeout){
        request.timeout=timeout;
        request.ontimeout=()=>{
            reject({message:"request timeout",timeout:true});
        };
    }
    request.send(typeof(body)==="string"?body:JSON.stringify(body));
});
