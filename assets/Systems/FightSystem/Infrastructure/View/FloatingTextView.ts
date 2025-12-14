import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import {Label} from 'cc';

@ccclass('FloatingTextView')
export class FloatingTextView extends Component {

    @property(Node)
    TextNode:Node;


    syncPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    setText(text:string){
        this.TextNode.getComponent(Label).string=text;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


