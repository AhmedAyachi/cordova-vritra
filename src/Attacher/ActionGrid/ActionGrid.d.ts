import {ViewInterface as View} from "cherries"


interface ActionGrid extends View {
    /**
     * Same as attacher.toggle(false)
     */
    unmount():void,
}
