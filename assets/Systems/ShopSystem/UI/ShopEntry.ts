import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

import {ShopApp} from '../Application/ShopApp';

import {ShopBoard} from './Assistant/ShopBoard';

@ccclass('ShopEntry')
export class ShopEntry extends Component {


    //组件
    @property(Node)
    ShopMerchant:Node=null;
    @property(Node)
    ShopBuyButton:Node=null;

    //子协助
    @property(Node)
    ShopBoard:Node=null;


    private ShopApp:ShopApp;

    private ShopBoardComponent:ShopBoard;

    Listen(){
        this.ShopMerchant.on(Node.EventType.TOUCH_END,this.ShopMerchantClick,this);
    }

    LoadComponent(){
        this.ShopApp=ShopApp.instance;
        this.ShopApp.initEntryUI(this);

        this.ShopBoardComponent=this.ShopBoard.getComponent(ShopBoard);
    }
    start() {
        this.LoadComponent();
        this.Listen();

    }
    //对App进行信息通信
    ShopMerchantClick(){
        this.ShopApp.ShopMerchantClick();
    }


    //对外提供调用接口
    openShopBoard(ShopItemInfoList){
        this.ShopBoardComponent.createShopBoard(ShopItemInfoList);
        this.ShopBoardComponent.open();
    }

    CallBack=(ItemId)=>{
        
    }

    CreateShopBoard(ShopItemInfoList){
        // this.BoxManager.CreateBoxBoard(ShopItemInfoList);
    }

    update(deltaTime: number) {
        
    }
}


