
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
         * @default cordova.file.dataDirectory
         */
        location:string,
    },
    callback:(sysfile:SystemFile)=>void,
    fallback:(error:Object)=>void,
):Promise<SystemFile>;
export default function useSystemFile(
    /**
     * Should start with file:///
     */
    fullpath:string,
    callback:(sysfile:SystemFile)=>void,
    fallback:(error:Object)=>void,
):Promise<SystemFile>;

export interface SystemFile {
    readonly name:String;
    readonly fullpath:String;
    readonly location:String;
    /**
     * Overwrites the file content
     */
    write(text:string,callback:SystemFileCallback,fallback:SystemFileFallback):void;

    /**
     * Adds content to the end of the file 
     * @param text 
     * @param callback 
     * @param fallback 
     */
    append(text:string,callback:SystemFileCallback,fallback:SystemFileFallback):void;

    /**
     * Reads the file content as text
     */
    onRead(callback:(content:String)=>void,fallback:SystemFileFallback):void;

    /**
     * Deletes the file
     */
    delete(callback:SystemFileCallback,fallback:SystemFileFallback):void;

    /**
     * Reads a file as data url.
     * 
     * @see Use it to read for example image files
     */
    readAsDataURL(callback:(data:string|ArrayBuffer|null)=>void,fallback:SystemFileFallback):void;
}

type SystemFileCallback=()=>void;
type SystemFileFallback=(error:Error)=>void;
