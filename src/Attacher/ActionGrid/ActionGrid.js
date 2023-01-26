import {useId,View,map} from "vanilla";
import css from "./ActionGrid.module.css";
import {image0,camera0,video0,file0} from "../Assets";


export default function ActionGrid(props){
    const {parent,id=useId("actiongrid"),actionIds,actionColor,multiple=true,sinistral,onPick,onUnmount}=props;
    const actiongrid=View({
        parent,id,
        style:styles.actiongrid(sinistral),
        className:`${css.actiongrid} ${props.className||""}`,
    }),state={
        actions:getActions(actionIds),
    },{actions}=state;

    actiongrid.innerHTML=`
        ${map(actions,({id,icon})=>`
            <img id="${id}" class="button ${css.action}" src="${icon(actionColor)}"/>
        `)}
    `;

    const actionEls=actiongrid.querySelectorAll(`.${css.action}`);
    actionEls.forEach(actionEl=>{
        const {onTrigger}=actions.find(({id})=>actionEl.id===id);
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
        ...[
            {id:"photo",key:"Image",icon:camera0},
            {id:"video",key:"Video",icon:video0},
        ].map(action=>({
            ...action,
            onTrigger:({multiple,onPick})=>{
                const {capture}=navigator.device;
                capture[`capture${action.id}`](files=>{
                    onPick&&onPick(multiple?files:files[0]);
                });
            },
        })),
        ...[
            ((cordova.platformId==="ios")&&{id:"image",icon:image0}),
            {id:"file",icon:file0},
        ].filter(action=>action).map(action=>({
            ...action,
            onTrigger:({multiple,onPick})=>{
                FilePicker.show({
                    multiple,onPick,
                    type:action.id==="image"?"image/*":"*/*",
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

const getActions=(ids)=>{
    const {actions}=statics;
    let results;
    if(ids&&ids.length){
        results=ids.map(id=>actions.find(action=>action.id===id)).filter(item=>item);
    }
    else{
        results=actions;
    }
    return results;
};
