import {ViewInterface as View} from "cherries"


type ActionGrid=View<"div">&{
    /**
     * Same as attacher.toggle(false)
     */
    unmount():void,
};
