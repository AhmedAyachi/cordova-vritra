import {SystemEntry,SystemEntryCallback,SystemEntryFallback} from "../SystemEntry/SystemEntry";

/**
 * A simpler way to use cordova-plugin-file API
 * @ Creates the file if not found
 * @returns A Promise so you can use await instead of the callback/fallback params
 * @see Browser support is for development only. Uses local storage items as files
 */
export default function useSystemFile(
    props:{
        /**
        * @default "NewFile.txt"
        */
        name:string,
        /**
         * @default cordova.file.cacheDirectory
         */
        location:string,
    },
    callback:(sysfile:SystemFile)=>void,
    fallback:SystemEntryFallback,
):Promise<SystemFile>;
export default function useSystemFile(
    /**
     * Should start with file:///
     */
    fullpath:string,
    callback:(sysfile:SystemFile)=>void,
    fallback:SystemEntryFallback,
):Promise<SystemFile>;

export interface SystemFile extends SystemEntry {
    
    /**
     * Overwrites the file content
     */
    write(text:string,callback:SystemEntryCallback,fallback:SystemEntryFallback):Promise<undefined>;

    /**
     * Adds content to the end of the file 
     * @param text 
     * @param callback 
     * @param fallback 
     */
    append(text:string,callback:SystemEntryCallback,fallback:SystemEntryFallback):Promise<undefined>;

    /**
     * @deprecated use readAsText instead
     * Reads the file content as text
     */
    onRead(callback:(content:String)=>void,fallback:SystemEntryFallback):void;

    /**
     * Reads the file content as text
     */
    readAsText(callback:(content:String)=>void,fallback:SystemEntryFallback):Promise<String>;

    /**
     * Reads a file as data url.
     * 
     * @see Use it to read for example image files to get the image content as base64 string
     */
    readAsDataURL(callback:(data:string|null)=>void,fallback:SystemEntryFallback):Promise<String|null>;
}
