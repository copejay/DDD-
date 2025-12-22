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

    @property(Node)
    UpType:Node

    private CallBack:(RoleID:string)=>void=null;

    private BoxID:string="null";

    setFormationUp(){
        console.log("RoleBox:设置为上阵状态");
        this.UpType.active=true;
    }

    setFormationDown(){
        console.log("RoleBox:设置为下阵状态");
        this.UpType.active=false;
    }

    //初始化位置
    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    //回调相关
    setBoxInfo(BoxID:string,callBack:(RoleID:string)=>void){
        // this.setPosition(x,y);
        this.setBoxID(BoxID);
        this.setCallBack(callBack);
    }

    setBoxID(BoxID:string){
        this.BoxID=BoxID;
    }

    setCallBack(callback:(RoleID:string)=>void){
        this.CallBack=callback;
    }

    onClick(){
        console.log("回调函数执行:"+this.BoxID);
        if(this.CallBack!=null){
            this.CallBack(this.BoxID);
        }
    }

    syncName(Name:string){
        this.Name.getComponent(Label).string=Name;
    }

    syncLevel(level:number){
        this.Info.getComponent(Label).string="等级:"+level;
    }

    //同步格子信息数据
    syncData(RoleData:{Name:string,level:number}){
        this.Name.getComponent(Label).string=RoleData.Name;
        this.Info.getComponent(Label).string="等级:"+RoleData.level;
    }

    //设置点击监听
    onLoad() {
        console.log(`RoleBox: start执行`);
        this.addListener();
        this.setFormationDown();
    }

    addListener(){
        this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
    }

}


