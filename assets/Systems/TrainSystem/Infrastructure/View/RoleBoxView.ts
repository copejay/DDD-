import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

@ccclass('RoleBoxView')
export class RoleBoxView extends Component {


    @property(Node)
    RoleImg:Node

    @property(Node)
    Name:Node

    @property(Node)
    Info:Node


    private BoxID:string;

    init(x:number,y:number,BoxID:string,callBack:()=>void){
        this.setPosition(x,y);
        this.setBoxID(BoxID);
        this.setCallBack(callBack);
    }

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    setBoxID(BoxID:string){
        this.BoxID=BoxID;
    }

    setCallBack(callback:()=>void){
        this.onClick=callback;
    }

    syncData(RoleData:{Name:string,level:number}){
        this.Name.getComponent(Label).string=RoleData.Name;
        this.Info.getComponent(Label).string="等级:"+RoleData.level;
    }


    start() {
        this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
    }

    onClick(){
        console.log("回调函数执行:"+this.BoxID);
    }

}


