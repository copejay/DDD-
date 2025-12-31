import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

@ccclass('Npc')
export class Npc extends Component {

    ID;

    @property(Node)
    NpcNameNode:Node;

    clickCB:(id:number)=>void;


    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    setName(Name:string){
        this.NpcNameNode.getComponent(Label).string=Name;
    }

    setID(ID:number){
        this.ID=ID;
    }

    setClickCB(ClickCB:(id:number)=>void){
        this.clickCB=ClickCB;
    }

    // 点击事件
    onClick(){
        if(this.clickCB){
            this.clickCB(this.ID);
        }else{
            console.log(`Npc:${this.ID} 没有设置点击事件`);
        }
    }

    listen(){
        this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
    }

    start() {
        this.listen();
    }

    update(deltaTime: number) {
        
    }
}


