import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemBoxView')
export class ItemBoxView extends Component {



    @property(Node)
    ItemNameNode;

    @property(Node)
    ItemNumNode;

    private ItemID:string;
    private ClickCallBack:(ItemID:string)=>void;

    start() {
        //对物品框设置点击事件
        this.node.on(Node.EventType.TOUCH_END,()=>{
            this.ClickCallBack(this.ItemID);
        },this);

    }

    setBoxCallBack(ItemID,CallBack:(ItemID:string)=>void){
        this.ItemID=ItemID;
        this.ClickCallBack=CallBack;
    }

    //设置物品框位置
    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    //同步物品名称
    syncName(ItemName){
        this.ItemNameNode.getComponent(Label).string=ItemName;
    }

    //同步物品数量
    syncNum(ItemNum){
        this.ItemNumNode.getComponent(Label).string=ItemNum;
    }

    update(deltaTime: number) {
        
    }
}


