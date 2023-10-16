import {ViewProps,ViewInterface as View} from "vritra";
import {ActionGrid} from "./ActionGrid/ActionGrid";


export default function Attacher(props:ViewProps<"div">&{
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
     * Shows and arranges the specified actions
     * @default ["photo","video","image","file"]
     * @see "image" id is available only for ios because can't pick documents and images at the same time on ios
     */
    actionIds:("photo"|"video"|"image"|"file")[],
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
    icon?:string|((color:string,weight:number)=>string),
    /**
     * @default true
     */
    onPick(selection:AttacherEntry|AttacherEntry[]):void,
}):Attacher;

type Attacher=View<"div">&{
    /**
     * Shows and hides the action grid.
     * @param toggled If true, shows the action grid otherwise hides it
     * @default toggling behavior
     */
    toggle(toggled:boolean):void,
    /**
     * Returns the ActionGrid element if visible otherwise null;
     */
    getActionGrid():ActionGrid,
}

type AttacherEntry=FileExplorerEntry&MediaFile;
