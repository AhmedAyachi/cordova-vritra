

export default (url,options)=>new Promise((resolve,reject)=>{
    const {method,headers,body,timeout=3000}=options;
    const request=new XMLHttpRequest();
    request.withCredentials=options.credentials;
    request.open(method||"GET",url);
    for(const key in headers){request.setRequestHeader(key,headers[key])};
    request.onreadystatechange=async ()=>{
        if(request.readyState===XMLHttpRequest.DONE){
            const response=new Response(request.responseText);
            resolve(response);
        }
    };
    if(timeout){
        request.timeout=timeout;
        request.ontimeout=()=>{reject({message:"request timeout",timeout:true})};
    }
    request.send(typeof(body)==="string"?body:JSON.stringify(body));
});
