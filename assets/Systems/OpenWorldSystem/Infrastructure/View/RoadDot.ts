import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoadDot')
export class RoadDot extends Component {
    start() {

    }

    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    update(deltaTime: number) {
        
    }
}


