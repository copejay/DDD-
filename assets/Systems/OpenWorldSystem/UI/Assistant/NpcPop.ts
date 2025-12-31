import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NpcPop')
export class NpcPop extends Component {


    @property(Node)
    NpcPopNode:Node;

    @property(Node)
    ClosePopNode:Node;


    close(){
        this.NpcPopNode.active=false;
    }
    open(){
        this.NpcPopNode.active=true;
    }

    listen(){
        this.ClosePopNode.on(Node.EventType.TOUCH_END,this.close,this);
    }

    start() {
        this.close();
        this.listen();
    }

    update(deltaTime: number) {
        
    }
}


