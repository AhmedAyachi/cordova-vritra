

export default function useSystemFile(props,callback,fallback){
    let name,location;
    if(typeof(props)==="string"){
        const index=props.lastIndexOf("/");
        name=props.substring(index+1);
        location=props.substring(0,index);
    }
    else{
        name=props.name||"NewFile.txt";
        location=props.location||cordova.file.dataDirectory;
    }
    return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                if(localStorage.getItem(name)===null){
                    localStorage.setItem(name,"");
                }
                resolve();
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(location,(folder)=>{
                folder.getFile(name,{create:true},resolve,reject);
            });
        }
    }).
    then(entry=>{
        const fullpath=entry?.nativeURL;
        const sysfile=new SystemFile({name,location,fullpath});
        callback&&callback(sysfile);
        return sysfile;
    }).
    catch(error=>{
        fallback&&fallback(error);
    });
}

class SystemFile {
    constructor({name,location,fullpath}){
        this.name=name;
        this.fullpath=fullpath||((location||"")+name);
        this.location=location;
        Object.seal(this);
    };

    write(text="",callback,fallback){
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                localStorage.setItem(this.name,text);
                callback&&callback();
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                entry.createWriter(fileWriter=>{
                    fileWriter.onwriteend=callback;
                    fileWriter.onerror=fallback;
                    fileWriter.write(new Blob([text]),{type:"text/plain"});
                });
            });
        }
    };

    append(text="",callback,fallback){
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                const content=localStorage.getItem(this.name);
                localStorage.setItem(this.name,content+text);
                callback&&callback();
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                entry.createWriter(fileWriter=>{
                    try{
                        const {length}=fileWriter;
                        length&&fileWriter.seek(length);
                        fileWriter.onwriteend=callback;
                        fileWriter.onerror=fallback;
                        fileWriter.write(new Blob([text]),{type:"text/plain"});
                    }
                    catch(error){
                        fallback&&fallback(error);
                    }
                });
            });
        }
    };
    
    onRead(callback,fallback){
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                const content=localStorage.getItem(this.name);
                callback&&callback(content);
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                entry.file(file=>{
                    const reader=new FileReader();
                    reader.onloadend=function(){
                        callback&&callback(this.result);
                    }
                    reader.readAsText(file);
                },fallback);
            });
        }
    };

    delete(callback,fallback){
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                localStorage.removeItem(this.name);
                callback&&callback();
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                entry.remove(callback,fallback);
            });
        }
    };

    readAsDataURL(callback,fallback){
        window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
            entry.file(file=>{
                const reader=new FileReader();
                reader.onloadend=()=>{
                    callback&&callback(reader.result);
                }
                reader.readAsDataURL(file);
            },fallback);
        });
    }

    /* static cacheFile(file){return new Promise((resolve,reject)=>{
        window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory,(folder)=>{
            folder.getFile(file.name,{create:true},(entry)=>{
                entry.createWriter(fileWriter=>{
                    fileWriter.onwriteend=()=>{
                        resolve&&resolve(entry);
                    };
                    fileWriter.write(file,{type:file.type});
                });
            },reject);
        })});
    } */
}

const timeout=100;
