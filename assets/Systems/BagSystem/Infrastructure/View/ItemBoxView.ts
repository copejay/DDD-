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

    AutoText(string:string){
        const chars = Array.from(string);
        let result = "";
        for (let i = 0; i < chars.length; i++) {
            result += chars[i];
            // 每 3 个字符插入一次换行
            if ((i + 1) % 3 === 0 && i !== chars.length - 1) {
                result += "\n";
            }
        }
        return result;
    }

    // setId(ItemID){
    //     this.ItemID=ItemID;
    // }

    //同步物品名称
    syncName(ItemName){
        let string=this.AutoText(ItemName);
        this.ItemNameNode.getComponent(Label).string=string;
    }

    //同步物品数量
    syncNum(ItemNum){
        this.ItemNumNode.getComponent(Label).string=ItemNum;
    }

    update(deltaTime: number) {
        
    }
}


