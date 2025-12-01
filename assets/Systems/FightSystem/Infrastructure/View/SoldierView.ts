import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoldierView')
export class SoldierView extends Component {


    sync(x:number,y:number){
        this.node.position=(new Vec3(x,y));
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


