import { _decorator, Component, Node } from 'cc';

import {Prefab} from 'cc';
const { ccclass, property } = _decorator;

import {ShopBoxManager} from './ShopBoxManager';

//协助-类
//ShopBoardUI
@ccclass('ShopPriceCells')
export class ShopPriceCells extends Component {

    @property(Prefab)
    ShopItemPrefab:Prefab=null;

    @property(Node)
    ShopItemParent:Node=null;

    @property(Node)
    ScrollContentNode:Node=null;

    @property(Node)
    ShopBoardNode:Node=null;

    @property(Node)
    CloseButton:Node=null;

    //子组件-管理格子
    private BoxManager:ShopBoxManager;
    EventBus:(event)=>void;

    private HighLightCell;


    //作为下属子类，初始化方法应该由父类主动进行调用
    init(){
        this.close();
        this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);

        this.BoxManager= new ShopBoxManager(this.ShopItemPrefab,this.ShopItemParent,this.CallBack);
    }


    initEventBus(EventBus:(event)=>void){
        this.EventBus=EventBus;
    }

    close(){
        this.ShopBoardNode.active=false;
        if(this.HighLightCell){
            this.HighLightCell.closeHighLight();
        }
    }

    open(){
        this.ShopBoardNode.active=true;
    }

    createShopBoard(ShopItemInfoList){
        this.BoxManager.CreateBoxBoard(ShopItemInfoList);
    }

    //对外提供调用接口
    CallBack=(ItemId,Cell)=>{
        // console.log("点击了"+ItemId);
        this.EventBus({type:'ShopItemClick',data:{id:ItemId}});
        this.highLightControl(Cell);
    }

    highLightControl(Cell){
        if(this.HighLightCell!=null){
            this.HighLightCell.closeHighLight();
        }
        this.HighLightCell=Cell;
        this.HighLightCell.openHighLight();
    }

    update(deltaTime: number) {
        
    }
}


