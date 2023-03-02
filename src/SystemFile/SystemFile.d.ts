
/**
 * A simpler way to use cordova-plugin-file APIs
 */
export default class SystemFile {

    readonly name:String;
    readonly fullpath:String;
    readonly location:String;

    constructor(
        props:{
            /**
             * @default "NewFile.txt"
             */
            name:string,
            location:string,
        },
        callback:(sysfile:SystemFile)=>void,
        fallback:SystemFileFallBack,
    );
    
    /**
     * Overwrites the file content
     */
    write(text:string,callback:SystemFileCallBack,fallback:SystemFileFallBack):void;

    /**
     * Adds content to the end of the file 
     * @param text 
     * @param callback 
     * @param fallback 
     */
    append(text:string,callback:SystemFileCallBack,fallback:SystemFileFallBack):void;

    /**
     * Reads the file content as text
     */
    onRead(callback:(content:String)=>void,fallback:SystemFileFallBack):void;

    /**
     * Deletes the file
     */
    delete(callback:SystemFileCallBack,fallback:SystemFileFallBack):void;

    /**
     * Reads a file as data url.
     * 
     * @see Use it to read for example image files
     */
    static readAsDataURL():void;

}

type SystemFileCallBack=(error:Object)=>void;
type SystemFileFallBack=(error:Object)=>void;
