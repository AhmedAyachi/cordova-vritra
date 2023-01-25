import {View,ViewProps} from "vanilla";


export default function Attacher(props:ViewProps&{
    actionGridClassName:string,
    /**
     * Attacher/actions icons color
     * @default "black"
     */
    color?:string,
    /**
     * Actions icons color
     * @default color prop value
     */
    actionColor?:string,
    /**
     * Allows Picking multiple files at the same time
     * @default true
     * @see Only affects the file picking action, camera and video actions always allow one file at a time
     */
    multiple?:boolean,
    /**
     * If true, the action grid will appear on the left
     * @default false
     */
    sinistral?:boolean,
    icon?:string|((color="black",weight=1)=>string),
    onPick(selection:AttacherEntry|AttacherEntry[]):void,
}):Attacher;

interface Attacher extends View {
    /**
     * Shows and hides the action grid.
     * @param toggled If true, shows the action grid otherwise hides it
     * @default toggling behavior
     */
    toggle(toggled:boolean):void,
    /**
     * Returns the ActionGrid element if visible otherwise null;
     */
    getActionGrid():HTMLElement,
}

type AttacherEntry=FilePickerEntry&MediaFile;
