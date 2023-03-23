import useSystemFile from "../useSystemFile/useSystemFile";


export default function useSystemFolder(props,callback,fallback){
    let location,name;
    if(typeof(props)==="string"){
        const index=props.lastIndexOf("/");
        name=props.substring(index+1);
        location=props.substring(0,index);
    }
    else{
        name=props.name||"NewFolder";
        location=props.location||cordova.file.dataDirectory;
    }
    return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser"){
            console.log(`folder ${name} created`);
            resolve();
        }
        else{
            window.resolveLocalFileSystemURL(location,(folder)=>{
                folder.getDirectory(name,{create:true},resolve,reject);
            },reject);
        }
    }).
    then(entry=>{
        const fullpath=entry?.nativeURL;
        const sysfolder=new SystemFolder({name,location,fullpath});
        callback&&callback(sysfolder);
        return sysfolder;
    }).
    catch(error=>{
        fallback&&fallback(error);
    });
}

class SystemFolder {
    constructor({name,location,fullpath}){
        this.location=location;
        this.name=name;
        this.fullpath=fullpath||((location||"")+name);
        Object.seal(this);
    };

    useFile(name,callback,fallback){
        return useSystemFile({location:this.fullpath,name},callback,fallback);
    }

    useFolder(name,callback,fallback){
        return useSystemFolder({location:this.fullpath,name},callback,fallback);
    }

    useEntries(callback,fallback){
        window.resolveLocalFileSystemURL(this.fullpath,(folder)=>{
            const reader=folder.createReader();
            reader.readEntries(entries=>{
                callback&&callback(entries.map(entry=>new SystemFolderEntry(entry)));
            },fallback);
        });
    }
}

class SystemFolderEntry {
    constructor(props={}){
        this.isFile=props.isFile;
        this.name=props.name;
        this.fullpath=props.nativeURL;
        Object.seal(this);
    }

    toSystemFile(callback,fallback){
        return this.isFile?useSystemFile(this.fullpath,callback,fallback):(fallback&&fallback({message:"entry not a file"}));
    }

    toSystemFolder(callback,fallback){
        return this.isFile?(fallback&&fallback({message:"entry not a folder"})):useSystemFolder(this.fullpath,callback,fallback);
    }
}
