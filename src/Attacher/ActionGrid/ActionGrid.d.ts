import {ViewInterface as View} from "vanilla"


interface ActionGrid extends View {
    /**
     * Same as attacher.toggle(false)
     */
    unmount():void,
}
