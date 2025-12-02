import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

@ccclass('RolePanel')
export class RolePanel extends Component {

    @property(Node)
    Info:Node;

    @property(Node)
    CloseButton:Node;

    showRolePanel(RoleID:string){
        this.node.active=true;
        this.Info.getComponent(Label).string="这只哈吉米的ID是:"+RoleID;
    }
    
    ClosePanel(){
        this.node.active=false;
    }

    addListener(){
        this.CloseButton.on(Node.EventType.TOUCH_END,this.clickCloseButton,this);
    }

    clickCloseButton(){
        this.ClosePanel();
    }

    start() {
        //开始是隐藏的
        this.ClosePanel();
        this.addListener();
    }

    update(deltaTime: number) {
        
    }
}


