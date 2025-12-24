import { _decorator, Component, Node } from 'cc';
import {Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShopItemView')
export class ShopItemView extends Component {

    @property(Node)
    NameLabel;

    @property(Node)
    PriceLabel;

    @property(Node)
    BgHighLightNode:Node=null;


    start() {
        this.closeHighLight();
    }

    setBoxInfo(id:string,ClickCallBack:(ShopItemID:string,Cell)=>void){
        this.node.on(Node.EventType.TOUCH_END,()=>{
            ClickCallBack(id,this);
        },this);
    }

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    syncName(Name){
        this.NameLabel.getComponent(Label).string=Name;
    }

    syncPrice(Price){
        this.PriceLabel.getComponent(Label).string=Price.toString();
    }

    openHighLight(){
        this.BgHighLightNode.active=true;
    }

    closeHighLight(){
        this.BgHighLightNode.active=false;
    }

    update(deltaTime: number) {
        
    }
}


