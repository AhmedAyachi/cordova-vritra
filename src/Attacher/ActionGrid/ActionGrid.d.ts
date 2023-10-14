import {ViewInterface as View} from "wurm"


type ActionGrid=View<"div">&{
    /**
     * Same as attacher.toggle(false)
     */
    unmount():void,
};
