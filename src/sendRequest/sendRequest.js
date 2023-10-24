

export default (url,options)=>new Promise((resolve,reject)=>{
    //fetch("",{})
    const {method,headers,body,timeout=3000}=options;
    const request=new XMLHttpRequest();
    request.open(method,url);
    for(const key in headers){request.setRequestHeader(key,headers[key])};
    request.onreadystatechange=async ()=>{
        if(request.readyState===XMLHttpRequest.DONE){
            const response=new Response(request.responseText);
            resolve(response);
        }
    };
    request.timeout=timeout;
    request.ontimeout=()=>{reject({message:"request timeout",timeout:true})};
    request.send(typeof(body)==="string"?body:JSON.stringify(body));
});
