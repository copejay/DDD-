import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

@ccclass('HintPopView')
export class HintPopView extends Component {


    syncLabel(HintLabel:string){
        const myLabel=this.node.getChildByName("HintLabel");
        if(myLabel){
            myLabel.getComponent(Label).string=HintLabel;
        }
    }

    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


