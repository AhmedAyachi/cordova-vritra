import {ViewInterface as View} from "vritra"


type ActionGrid=View<"div">&{
    /**
     * Same as attacher.toggle(false)
     */
    unmount():void,
};
