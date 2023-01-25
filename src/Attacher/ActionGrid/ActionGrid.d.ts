import {ViewInterface as View} from "vanilla"


interface ActionGrid extends View {
    /**
     * Fades out the ActionGrid and removes ir from DOM
     */
    unmount():void,
}
