import {useId,View} from "vanilla";
import css from "./Attacher.module.css";
import ActionGrid from "./ActionGrid/ActionGrid";
import {paperclip0} from "./Assets";


export default function Attacher(props){
    const {parent,id=useId("attacher"),icon=paperclip0,color="black",multiple=true,sinistral,onPick}=props;
    const attacher=View({
        parent,id,
        style:props.style,
        position:props.position,
        className:`${css.attacher} ${props.className||""}`,
    }),state={
        actiongrid:null,
    };

    attacher.innerHTML=`
        <img class="button ${css.icon}" alt="attachment" src="${typeof(icon)==="function"?icon(color):icon}"/>
    `;

    attacher.onclick=()=>{attacher.toggle()};

    attacher.toggle=(toggled=!Boolean(state.actiongrid))=>{
        const {actiongrid}=state;
        if(toggled){
            if(!actiongrid){
                state.actiongrid=ActionGrid({
                    parent:attacher,
                    className:props.actionGridClassName,
                    actionColor:props.actionColor||color,
                    sinistral,multiple,onPick,
                    onUnmount:()=>{
                        state.actiongrid=null;
                    },
                });
            }
        }
        else if(actiongrid){
            actiongrid.unmount();
        }
    }

    attacher.getActionGrid=()=>state.actiongrid;

    return attacher;
}
