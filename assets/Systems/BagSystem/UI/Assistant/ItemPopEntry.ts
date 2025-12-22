import { _decorator, Component, Node } from 'cc';

import {Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemPopEntry')
export class ItemPopEntry extends Component {


    @property(Node)
    ItemPopNode;

    @property(Node)
    Name;

    @property(Node)
    Info;

    @property(Node)
    CloseButton;



    start() {
        this.close();
        this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);
    }

    open(){
        this.ItemPopNode.active=true;
    }

    close(){
        this.ItemPopNode.active=false;
    }

    syncInfo(StackItem){
        this.Name.getComponent(Label).string=StackItem.id;
        this.Info.getComponent(Label).string=StackItem.count;
    }

    update(deltaTime: number) {
        
    }
}


