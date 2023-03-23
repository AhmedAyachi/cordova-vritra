import {SystemFileFallBack,SystemFile} from "../useSystemFile/useSystemFile";

/**
 * Gets/creates a folder
 * @param props 
 * @param callback 
 * @param fallback 
 */
export default function useSystemFolder(
    props:{location:string,name:string},
    callback:(sysfolder:SystemFolder)=>void,
    fallback:(error:Error)=>void,
):Promise<SystemFolder>;
export default function useSystemFolder(
    path:string,
    callback:(sysfolder:SystemFolder)=>void,
    fallback:(error:Error)=>void,
):Promise<SystemFolder>;

interface SystemFolder {
    readonly name:String;
    readonly fullpath:String;
    readonly location:String;

    useFile(
        name:string,
        callback:(sysfile:SystemFile)=>void,
        fallback:SystemFolderFallBack,
    ):Promise<SystemFile>,

    useFolder(
        name:string,
        callback:(sysfolder:SystemFolder)=>void,
        fallback:SystemFolderFallBack,
    ):Promise<SystemFolder>,

    useEntries(
        callback:(entries:SystemFolderEntry[])=>void,
        fallback:SystemFolderFallBack,
    ):void,
}

type SystemFolderCallBack=()=>void;
type SystemFolderFallBack=(error:Error)=>void;

interface SystemFolderEntry {
    readonly name:String,
    readonly fullpath:String,
    readonly isFile:Boolean,

    toSystemFile(
        callback:(sysfile:SystemFile)=>void,
        fallback:SystemFileFallBack,
    ):Promise<SystemFile>,

    toSystemFolder(
        callback:(sysfolder:SystemFolder)=>void,
        fallback:SystemFolderFallBack,
    ):Promise<SystemFolder>,
}
