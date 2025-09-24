import {isValidFolderName} from "../index";
import SystemEntry,{getSystemEntryProps} from "../SystemEntry/SystemEntry";
import useSystemFile from "../SystemFile/SystemFile";


export default function useSystemFolder(props,callback,fallback){
    const {location,name="NewFolder"}=getSystemEntryProps(props);
    if(isValidFolderName(name)) return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser") resolve();
        else if(cordova.platformId==="electron"){
            window.requestFileSystem(LocalFileSystem.PERSISTENT,0,(fileSystem)=>{
                fileSystem.root.getDirectory(location,{create:true},(folder)=>{
                    folder.getDirectory(name,{create:true},resolve,reject);
                });
            },reject);
        }
        else{
            window.resolveLocalFileSystemURL(location,(folder)=>{
                folder.getDirectory(name,{create:true},resolve,reject);
            },reject);
        }
    }).then(entry=>{
        const fullpath=entry?.nativeURL;
        const sysfolder=new SystemFolder({name,location,fullpath});
        callback&&callback(sysfolder);
        return sysfolder;
    }).catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    });
    else throw new Error("invalid folder name: "+name);
}

class SystemFolder extends SystemEntry {

    constructor(props){
        super(props);
    };
    
    useFile(name,callback,fallback){
        return useSystemFile({location:this.fullpath,name},callback,fallback);
    }

    useFolder(name,callback,fallback){
        return useSystemFolder({location:this.fullpath,name},callback,fallback);
    }

    useEntries(callback,fallback){return new Promise((resolve,reject)=>{
        if(cordova.platformId==="browser") resolve();
        else{
            window.resolveLocalFileSystemURL(this.fullpath,(entry)=>{
                const reader=entry.createReader();
                reader.readEntries(entries=>{
                    resolve(entries.map(entry=>new SystemFolderEntry(entry)));
                },reject);
            },reject);
        }
    }).
    then(callback).
    catch(error=>{
        fallback&&fallback(error);
        return Promise.reject(error);
    })};
}

class SystemFolderEntry {
    constructor(props={}){
        this.isFile=props.isFile;
        this.name=props.name;
        this.fullpath=props.nativeURL;
        Object.seal(this);
    }

    toSystemFile(callback,fallback){
        if(this.isFile) return useSystemFile(this.fullpath,callback,fallback);
        else return fallback&&fallback({message:"the entry is not a file"});
    }

    toSystemFolder(callback,fallback){
        if(this.isFile) return fallback&&fallback({message:"the entry is not a folder"});
        else return useSystemFolder(this.fullpath,callback,fallback);
    }
}
