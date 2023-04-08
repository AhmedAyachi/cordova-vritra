

export default class SystemEntry {

    #name;#extension;
    #location;#fullpath;
    #isFile
    constructor({name,location,fullpath,asFile}){
        this.#name=name;
        this.#location=location;
        this.#fullpath=fullpath;
        this.#isFile=asFile;
        if(asFile){
            const doti=name.lastIndexOf(".");
            this.#extension=name.substring(doti+1);
        } 
    };

    get name(){
        return this.#name;
    }
    get location(){
        return this.#location;
    }
    get fullpath(){
        let fullpath=this.#fullpath;
        if(!fullpath){
            const location=this.#location;
            this.#fullpath=fullpath=((location||"")+(location?.endsWith("/")?"":"/")+this.#name);
        }
        return fullpath;
    }
    
    rename(newName,callback,fallback){return new Promise((resolve,reject)=>{
        const name=newName+(this.#isFile?"."+this.#extension:"");
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                const value=localStorage.getItem(this.name);
                if(value!==null){
                    localStorage.setItem(name,value);
                    localStorage.removeItem(this.#name);
                }
                resolve(name);
            },350);
        }
        else{
            window.resolveLocalFileSystemURL(this.location,(direntry)=>{
                window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                    try{
                        entry.moveTo(direntry,name,()=>{resolve(name)},reject);
                    }
                    catch(error){reject(error)}
                },reject);
            },reject);
        }
    }).
    then(name=>{
        this.#name=name;
        this.#fullpath=null;
        callback&&callback();
    }).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })}

    copyTo(path,callback,fallback){return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){resolve()}
        else{
            window.resolveLocalFileSystemURL(path,(direntry)=>{
                window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                    try{
                        entry.copyTo(direntry,this.name,resolve,reject);
                    }
                    catch(error){reject(error)}
                },reject);
            },reject);
        }
    }).
    then(callback).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })}

    moveTo(path,callback,fallback){return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){resolve()}
        else{
            window.resolveLocalFileSystemURL(path,(direntry)=>{
                window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                    try{
                        entry.moveTo(direntry,this.name,resolve,reject);
                    }
                    catch(error){reject(error)}
                },reject);
            },reject);
        }
    }).
    then(()=>{
        this.#location=path;
        this.#fullpath=null;
        callback&&callback();
    }).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })}

    delete(callback,fallback){return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){
            setTimeout(()=>{
                localStorage.removeItem(this.name);
                resolve();
            },timeout);
        }
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                entry.remove(resolve,reject);
            });
        }
    }).
    then(callback).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })}
}

export const getSystemEntryProps=(props)=>{
    let name,location;
    if(typeof(props)==="string"){
        const index=props.lastIndexOf("/");
        name=props.substring(index+1);
        location=props.substring(0,index);
    }
    else{
        name=props.name||undefined;
        location=props.location||cordova.file.cacheDirectory;
    }
    return {location,name};
}
