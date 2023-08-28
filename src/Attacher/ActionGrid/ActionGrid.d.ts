import {ViewInterface as View} from "corella"


type ActionGrid=View<"div">&{
    /**
     * Same as attacher.toggle(false)
     */
    unmount():void,
};
