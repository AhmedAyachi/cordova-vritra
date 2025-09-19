

export * from "./CordovaFilePlugin";
export {default as sendRequest} from "./sendRequest/sendRequest";

export const globalizeLanguage=(language)=>{
    const langId=language.$id||language._id||language.id;
    localStorage.setItem("langId",langId);
    document.documentElement.setAttribute("lang",langId);
    window.language=Object.freeze({
        ...language,
        get:(key)=>key?(language[key]||key):"",
    });
}
//export {default as Attacher} from "./Attacher/Attacher";
