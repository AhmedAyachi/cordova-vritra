import SystemEntry,{getSystemEntryProps} from "../SystemEntry/SystemEntry";


/**
 * Uses a system file and creates it if it does not exist
 */
export default function useSystemFile(props,callback,fallback){
    const {location,name="NewFile.txt"}=getSystemEntryProps(props);
    return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                if(name){
                    if(localStorage.getItem(name)===null){
                        localStorage.setItem(name,"");
                    }
                    resolve();
                }
                else{
                    reject({message:"file must have a name"});
                }
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(location,(folder)=>{
                folder.getFile(name,{create:true},resolve,reject);
            },reject);
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

class SystemFile extends SystemEntry {
    
    constructor(props){
        props.asFile=true;
        super(props);
    };
    
    write(text="",callback,fallback){return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                localStorage.setItem(this.name,text);
                resolve();
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                entry.createWriter(fileWriter=>{
                    fileWriter.onwriteend=resolve;
                    fileWriter.onerror=reject;
                    fileWriter.write(new Blob([text]),{type:"text/plain"});
                });
            });
        }
    }).
    then(callback).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })};

    append(text="",callback,fallback){return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                const content=localStorage.getItem(this.name);
                localStorage.setItem(this.name,content+text);
                resolve();
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                entry.createWriter(fileWriter=>{
                    try{
                        const {length}=fileWriter;
                        length&&fileWriter.seek(length);
                        fileWriter.onwriteend=resolve;
                        fileWriter.onerror=reject;
                        fileWriter.write(new Blob([text]),{type:"text/plain"});
                    }
                    catch(error){reject(error)}
                });
            });
        }
    }).
    then(callback).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })};
    
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

    readAsText(callback,fallback){return new Promise((resolve,reject)=>{
        this.onRead(resolve,reject);
    }).
    then(callback).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })};

    readAsDataURL(callback,fallback){return new Promise((resolve,reject)=>{
        window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
            entry.file(file=>{
                const reader=new FileReader();
                reader.onloadend=()=>{
                    resolve(reader.result);
                }
                reader.readAsDataURL(file);
            },reject);
        });
    }).
    then(callback).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })}
}

const timeout=100;
