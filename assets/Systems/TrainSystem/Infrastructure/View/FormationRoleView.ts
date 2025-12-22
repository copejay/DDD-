import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

@ccclass('FormationRoleView')
export class FormationRoleView extends Component {

    @property(Node)
    NameLabelNode:Node;

    @property(Node)
    LevelLabelNode:Node;


    setName(Name:string){
        this.NameLabelNode.getComponent(Label).string=Name;
    }

    setLevel(Level:number){
        this.LevelLabelNode.getComponent(Label).string=`Level:${Level}`;
    }

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


