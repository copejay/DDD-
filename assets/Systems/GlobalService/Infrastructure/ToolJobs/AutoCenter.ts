import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AutoCenter')
export class AutoCenter extends Component {


    
    start() {
        this.node.setPosition(0,0);

    }

    update(deltaTime: number) {
        
    }
}


