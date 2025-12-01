import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;


@ccclass('SimpleBoard')
export class SimpleBoard extends Component {



    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    setString(itemNum:number){
        this.node.getChildByName("num")!.getComponent(Label)!.string=itemNum.toString();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


