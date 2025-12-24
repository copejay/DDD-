import { _decorator, Component, Node } from 'cc';

import {Prefab,Label} from 'cc';
const { ccclass, property } = _decorator;

// import {ShopBoxManager} from './ShopBoxManager';

//协助-类
//ShopBoardUI
@ccclass('ShopBuyCell')
export class ShopBuyCell extends Component {

    @property(Node)
    ShopBuyButton:Node=null;

    @property(Node)
    ShopBuyPrice:Node=null;

    @property(Node)
    ShopBuyName:Node=null;


    SyncInfo(ShopItemInfo){
        //同步信息
        this.ShopBuyName.getComponent(Label).string=ShopItemInfo.name;
        this.ShopBuyPrice.getComponent(Label).string=ShopItemInfo.price.toString();
    }

    // //子组件-管理格子
    // private BoxManager:ShopBoxManager;

    // close(){
    //     this.ShopBoardNode.active=false;
    // }

    // open(){
    //     this.ShopBoardNode.active=true;
    // }
         
    // start() {
    //     this.close();
    //     this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);

    //     this.BoxManager= new ShopBoxManager(this.ShopItemPrefab,this.ShopItemParent,this.CallBack);

    // }

    // createShopBoard(ShopItemInfoList){
    //     this.BoxManager.CreateBoxBoard(ShopItemInfoList);
    // }

    // //对外提供调用接口
    // CallBack=(ItemId)=>{
    //     console.log("点击了"+ItemId);
    // }

    // update(deltaTime: number) {
        
    // }
}


