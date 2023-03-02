

const timeout=100;

export default class SystemFile {
    constructor({name="NewFile.txt",location=cordova.file.dataDirectory},callback,fallback){
        this.name=name;
        this.fullpath=(location||"")+name;
        this.location=location;
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                if(localStorage.getItem(name)===null){
                    localStorage.setItem(name,"");
                }
                callback&&callback(this);
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(location,(folder)=>{
                folder.getFile(name,{create:true},(entry)=>{
                    this.fullpath=entry.nativeURL;
                    callback&&callback(this);
                },fallback);
            });
        }
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
                        fileWriter.seek(fileWriter.length);
                        fileWriter.onwriteend=callback;
                        fileWriter.onerror=fallback;
                        fileWriter.write(new Blob([content]),{type:"text/plain"});
                    }
                    catch{
                        fallback&&fallback();
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

    static readAsDataURL(fullpath,callback,fallback){
        window.resolveLocalFileSystemURL(fullpath,(entry)=>{
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
