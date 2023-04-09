import {SystemEntry,SystemEntryFallback} from "../SystemEntry/SystemEntry";
import {SystemFile} from "../SystemFile/SystemFile";

/**
 * Uses a system folder and creates it if it does not exist
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

interface SystemFolder extends SystemEntry {

    useFile(
        name:string,
        callback:(sysfile:SystemFile)=>void,
        fallback:SystemEntryFallback,
    ):Promise<SystemFile>,

    useFolder(
        name:string,
        callback:(sysfolder:SystemFolder)=>void,
        fallback:SystemEntryFallback,
    ):Promise<SystemFolder>,

    useEntries(
        callback:(entries:SystemFolderEntry[])=>void,
        fallback:SystemEntryFallback,
    ):Promise<SystemFolderEntry[]>,
}

interface SystemFolderEntry {
    readonly name:String,
    readonly fullpath:String,
    readonly isFile:Boolean,

    toSystemFile(
        callback:(sysfile:SystemFile)=>void,
        fallback:SystemEntryFallback,
    ):Promise<SystemFile>,

    toSystemFolder(
        callback:(sysfolder:SystemFolder)=>void,
        fallback:SystemEntryFallback,
    ):Promise<SystemFolder>,
}
