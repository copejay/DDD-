import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

@ccclass('M_RoadCell')
export class M_RoadCell extends Component {

    @property(Node)
    RoadNameNode:Node;
    mapX;
    mapY;

    clickCB:(x:number,y:number)=>void;


    SyncPosition(x,y){
        this.node.setPosition(x,y);
    }

    buildSite(x,y){
        this.mapX=x;
        this.mapY=y;
    }

    buildName(Name:string){
        this.RoadNameNode.getComponent(Label).string=Name;
    }

    start(){
        this.listen();

    }

    listen(){
        this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
    }

    onClick(){
        if(this.clickCB){
            this.clickCB(this.mapX,this.mapY);
        }
        console.log("点击了"+this.mapX+","+this.mapY);
    }

    initCB(cb:(x:number,y:number)=>void){
        console.log("M_RoadCell: 初始化");
        this.clickCB=cb;
    }

    update(deltaTime: number) {
        
    }
}


