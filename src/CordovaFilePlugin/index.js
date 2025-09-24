

export {default as useSystemFolder} from "./SystemFolder/SystemFolder";
export {default as useSystemFile} from "./SystemFile/SystemFile";

export const isValidFileName=(name="")=>{
    return isValidFolderName(name)&&!name.startsWith(".");
}

export const isValidFolderName=(name="")=>{
    return name&&
        (name.length<=255)&&
        (name===name.trim?.())&&
        !name.match(/[\/:\*\?"'<>\|\x00]/)
    ;
}
