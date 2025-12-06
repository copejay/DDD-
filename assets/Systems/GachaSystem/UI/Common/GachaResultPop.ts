import { _decorator, Component, Node } from 'cc';
import { Label } from 'cc';



const { ccclass, property } = _decorator;

@ccclass('GachaResultPop')
export class GachaResultPop extends Component {



    @property(Node)
    CloseButton:Node;

    @property(Node)
    GachaResultLabelNode:Node;

    private GachaResultLabel:Label=null;


    start() {
        this.HidePop();
        this.GachaResultLabel=this.GachaResultLabelNode.getComponent(Label);

        this.CloseButton.on(Node.EventType.TOUCH_END,this.HidePop,this);
    }


    //控制弹窗显示与隐藏
    ShowPop(){
        this.node.active=true;
    }
    HidePop(){
        this.node.active=false;
    }

    update(deltaTime: number) {
        
    }
}


