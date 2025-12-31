import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

@ccclass('L_RoadCell')
export class L_RoadCell extends Component {

    @property(Node)
    RoadNameNode:Node;

//    View.SyncPosition(Px,Py);
//                 View.buildSite(x,y);
//                 View.buildName(mapName);
    mapX;
    mapY;

    clickCB:(x:number,y:number)=>void;


    SyncPosition(Px,Py){
        this.node.setPosition(Px,Py);
    }

    buildSite(x,y){
        this.mapX=x;
        this.mapY=y;
    }

    buildName(Name:string){
        this.RoadNameNode.getComponent(Label).string=Name;
    }

    // listen(){
    //     this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
    // }

    // onClick(){
    //     if(this.clickCB){
    //         this.clickCB(this.mapX,this.mapY);
    //     }
    //     console.log("点击了"+this.mapX+","+this.mapY);
    // }

    initCB(cb:(x:number,y:number)=>void){
        this.clickCB=cb;
    }

    start() {
        // this.listen();

    }

    update(deltaTime: number) {
        
    }
}


