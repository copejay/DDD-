import { _decorator, Component, Node,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Persisite')
export class Persisite extends Component {
    
    start() {
        director.addPersistRootNode(this.node);
    }

    update(deltaTime: number) {
        
    }
}


