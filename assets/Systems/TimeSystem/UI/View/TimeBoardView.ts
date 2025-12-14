import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TimeBoardView')
export class TimeBoardView extends Component {

    @property(Node)
    TimeLabel:Node=null;

    setTimeString(timeString:string){
        this.TimeLabel.getComponent(Label).string=timeString;
    }

    start() {
        this.TimeLabel.getComponent(Label).string="null";
    }

    update(deltaTime: number) {
        
    }
}


