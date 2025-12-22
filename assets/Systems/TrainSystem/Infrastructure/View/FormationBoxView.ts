import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FormationBoxView')
export class FormationBoxView extends Component {



    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


