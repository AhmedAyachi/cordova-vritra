

export interface SystemEntry {
    
    readonly name:String;
    readonly fullpath:String;
    readonly location:String;

    /**
     * 
     * @param path path of the file new location
     */
    copyTo(path:string,callback:SystemEntryCallback,fallback:SystemEntryFallback):Promise<undefined>;

    /**
     * 
     * @param path new location path
     * @see If the file is located in a read-only location, it behaves as the copyTo method
     */
    moveTo(path:string,callback:SystemEntryCallback,fallback:SystemEntryFallback):Promise<undefined>;

    /**
     * Renames the current entry.
     * @param newName entry new basename (without extension)
     * @see Does not change the file extension
     */
    rename(newName:string,callback:SystemEntryCallback,fallback:SystemEntryFallback):Promise<undefined>;

    /**
     * Deletes the entry
     */
    delete(callback:SystemEntryCallback,fallback:SystemEntryFallback):Promise<undefined>;
}

type SystemEntryCallback=()=>void;
type SystemEntryFallback=(error:Error)=>void;
