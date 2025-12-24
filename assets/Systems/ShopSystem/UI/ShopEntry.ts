import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

import {ShopApp} from '../Application/ShopApp';

// import {ShopBoard} from './Assistant/ShopBoard';
import {ShopPriceCells} from './Assistant/ShopPriceCells';
import {ShopBuyCell} from './Assistant/ShopBuyCell';

@ccclass('ShopEntry')
export class ShopEntry extends Component {


    //组件
    @property(Node)
    ShopMerchant:Node=null;
    // @property(Node)
    // ShopBuyButton:Node=null;

    //子协助
    @property(Node)
    ShopPriceCellsNode:Node=null;
    // ShopBoard:Node=null;
    @property(Node)
    ShopBuyCellNode:Node=null;


    private ShopApp:ShopApp;

    // private ShopBoardComponent:ShopBoard;
    private ShopPriceCells:ShopPriceCells;
    private ShopBuyCell:ShopBuyCell;

    Listen(){
        this.ShopMerchant.on(Node.EventType.TOUCH_END,this.ShopMerchantClick,this);
    }

    LoadComponent(){
        this.ShopApp=ShopApp.instance;
        this.ShopApp.initEntryUI(this);

        this.ShopPriceCells=this.ShopPriceCellsNode.getComponent(ShopPriceCells);
        this.ShopPriceCells.initEventBus((event)=>{
            this.EventBus(event);
        });
        this.ShopPriceCells.init();

        this.ShopBuyCell=this.ShopBuyCellNode.getComponent(ShopBuyCell);
    }

    start() {
        this.LoadComponent();
        this.Listen();
    }

//协助组件【向上】通信机制
    EventBus(event){
        if(event.type=='ShopItemClick'){
            let id=event.data.id;
            console.log(`ShopEntry: ShopItemClick id=${id}`);
            this.BuyCellRefresh({name:id,price:100});
        }else{
            console.log(`ShopEntry: unKnow Event！`);
        }
    }

    //对App进行信息通信
    ShopMerchantClick(){
        this.ShopApp.ShopMerchantClick();
    }
    //调用协助
    BuyCellRefresh(ShopItemInfo){
        this.ShopBuyCell.SyncInfo(ShopItemInfo);
    }


    //对外提供调用接口
    openShopBoard(ShopItemInfoList){
        this.ShopPriceCells.createShopBoard(ShopItemInfoList);
        this.ShopPriceCells.open();
    }


    update(deltaTime: number) {
        
    }
}


