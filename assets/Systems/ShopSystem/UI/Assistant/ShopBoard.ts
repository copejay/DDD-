// import { _decorator, Component, Node } from 'cc';

// import {Prefab} from 'cc';
// const { ccclass, property } = _decorator;

// import {ShopBoxManager} from './ShopBoxManager';

// //协助-类
// //ShopBoardUI
// @ccclass('ShopBoard')
// export class ShopBoard extends Component {

//     @property(Prefab)
//     ShopItemPrefab:Prefab=null;

//     @property(Node)
//     ShopItemParent:Node=null;

//     @property(Node)
//     ScrollContentNode:Node=null;

//     @property(Node)
//     ShopBoardNode:Node=null;

//     @property(Node)
//     CloseButton:Node=null;

//     //子组件-管理格子
//     private BoxManager:ShopBoxManager;

//     close(){
//         this.ShopBoardNode.active=false;
//     }

//     open(){
//         this.ShopBoardNode.active=true;
//     }
         
//     start() {
//         this.close();
//         this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);

//         this.BoxManager= new ShopBoxManager(this.ShopItemPrefab,this.ShopItemParent,this.CallBack);

//     }

//     createShopBoard(ShopItemInfoList){
//         this.BoxManager.CreateBoxBoard(ShopItemInfoList);
//     }

//     //对外提供调用接口
//     CallBack=(ItemId)=>{
//         console.log("点击了"+ItemId);
//     }

//     update(deltaTime: number) {
        
//     }
// }


