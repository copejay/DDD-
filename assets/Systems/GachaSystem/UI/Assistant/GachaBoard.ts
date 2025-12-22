import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GachaBoard')
export class GachaBoard extends Component {


    @property(Node)
    GachaBoardNode:Node;

    @property(Node)
    CloseButton:Node;

    @property(Node)
    GachaButton:Node;

    private ClickGachaButtonCallBack:()=>void;


    start(){

        this.HidePop();
        this.CloseButton.on(Node.EventType.TOUCH_END,this.HidePop,this);

        this.GachaButton.on(Node.EventType.TOUCH_END,this.ClickGachaButton,this);
    }

    initClickGachaButtonCallBack(CallBack){
        this.ClickGachaButtonCallBack=CallBack;
    }


    ClickGachaButton(){
        console.log("ClickGachaButton");
        // this.GachaApplication.GachaOne();
        // this.showGachaResultPop();
        if(this.ClickGachaButtonCallBack){
            this.ClickGachaButtonCallBack();
        }
    }


    //开启与关闭弹窗
    ShowPop(){
        this.GachaBoardNode.active=true;
    }
    HidePop(){
        this.GachaBoardNode.active=false;
    }


    update(deltaTime: number) {
        
    }
}


