import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';



@ccclass('FightRoleView')
export class FightRoleView extends Component {


    @property(Node)
    NameNode:Node;

    @property(Node)
    LevelNode:Node;

    @property(Node)
    TitleNode:Node;

    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    setName(name:string){
        this.NameNode.getComponent(Label).string=name;
    }

    setLevel(level:number){
        this.LevelNode.getComponent(Label).string="等级: "+level.toString();
    }

    setTitle(title:string){
        this.TitleNode.getComponent(Label).string=title;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


