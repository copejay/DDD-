

import {Node,Label} from 'cc';

export class Message{

    MessageLabelNode:Node;

    MessageList:string[]=[];

    MessageMaxLength=30;

    constructor(MessageLabelNode){
        this.MessageLabelNode=MessageLabelNode;
    }


    addMessage(msg:string){
        this.MessageList.push(msg);
        if(this.MessageList.length>this.MessageMaxLength){
            this.MessageList.shift();
        }
        this.showMessage();
    }

    composeMessage(list: string[]): string{
        let result = "";
        for (let i = list.length - 1; i >= 0; i--) {
            result += list[i] + "\n";
        }
        return result;
    }

    showMessage(){
        let msg=this.composeMessage(this.MessageList);
        this.MessageLabelNode.getComponent(Label).string=msg;

    }

}