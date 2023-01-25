import {useId,View,map} from "vanilla";
import css from "./ActionGrid.module.css";
import {image0,camera0,video0,file0} from "../Assets";


export default function ActionGrid(props){
    const {parent,id=useId("actiongrid"),actionColor,sinistral,multiple,onPick,onUnmount}=props;
    const actiongrid=View({
        parent,id,
        style:styles.actiongrid(sinistral),
        className:`${css.actiongrid} ${props.className||""}`,
    });

    actiongrid.innerHTML=`
        ${map(statics.actions,({id,icon})=>`
            <img id="${id}" class="button ${css.action}" src="${icon(actionColor)}"/>
        `)}
    `;

    const actionEls=actiongrid.querySelectorAll(`.${css.action}`);
    actionEls.forEach(actionEl=>{
        const {onTrigger}=statics.actions.find(({id})=>actionEl.id===id);
        actionEl.onclick=(event)=>{
            event.stopPropagation();
            onTrigger&&onTrigger({multiple,onPick});

        };
    });

    actiongrid.unmount=()=>{
        actiongrid.style.animation=`${sinistral?css.slideLeft:css.slideRight} ${statics.duration}ms ease-in 1 reverse forwards`;
        setTimeout(()=>{
            actiongrid.remove();
            onUnmount&&onUnmount();
        },statics.duration);
    }

    setTimeout(()=>{actiongrid.style.animation=null},statics.duration+50);
    return actiongrid;
}

const statics={
    duration:200,
    actions:[
        ...[{id:"Image",icon:camera0},{id:"Video",icon:video0}].map(action=>({
            ...action,
            onTrigger:({multiple,onPick})=>{
                const {capture}=navigator.device;
                capture[`capture${action.id}`](files=>{
                    onPick&&onPick(multiple?files:files[0]);
                });
            },
        })),
        ...[
            ((cordova.platformId==="ios")&&{id:"picture",icon:image0}),
            {id:"file",icon:file0},
        ].filter(action=>action).map(action=>({
            ...action,
            onTrigger:({multiple,onPick})=>{
                FilePicker.show({
                    multiple,onPick,
                    type:action.id==="picture"?"image/*":"*/*",
                });
            },
        })),
    ],
},styles={
    actiongrid:(sinistral)=>`
        ${sinistral?"right":"left"}:115%;
        animation:${sinistral?css.slideLeft:css.slideRight} ${statics.duration}ms ease-in 1 forwards;
    `,
}
