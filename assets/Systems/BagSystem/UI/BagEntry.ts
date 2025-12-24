import { _decorator, Component, Node, UITransform } from 'cc';
import { Prefab } from 'cc';
const { ccclass, property } = _decorator;

//子类
// import { ChildBagBoard } from './ChildBagBoard';
import { BagCellsManager } from './Assistant/BagCellsManager';
import {BagPopManager} from './Assistant/BagPopManager';
// import { ChildBagPop} from './ChildBagPop';

//引入管理层
import { BagApp } from '../Application/BagApp';


//Entry仅仅进行管理就行了，具体的功能UI由Assistant里面的去做
@ccclass('BagEntry')
export class BagEntry extends Component {
    

    // @property({type:Node,tooltip:"ChildBoard"})
    // ChildBoardNode:Node=null;
    @property({type:Node,tooltip:"BagCellsManager"})
    BagCellsManagerNode:Node=null;

    // @property({type:Node,tooltip:"ChildBagPop"})
    // ChildPopNode:Node=null;
    @property({type:Node,tooltip:"BagPopManager"})
    BagPopManagerNode:Node=null;

    @property({type:Node,tooltip:"切换武器背包的按钮"})
    SwitchWeaponBagBtn:Node=null;

    @property({type:Node,tooltip:"切换物品背包的按钮"})
    SwitchItemBagBtn:Node=null;

    //ChildBoard
    // ChildBagBoard:ChildBagBoard=null;

    //BagCellsManager
    BagCellsManager:BagCellsManager=null;
    //BagPopManager
    BagPopManager:BagPopManager=null;
    
    // ChildBagPop:ChildBagPop=null;

    //App层
    BagApp:BagApp;

    //加载类运行所需的东西
    LoadComponent(){
        console.log("BagEntry: LoadComponent开始");
        //初始化管理层
        this.BagApp=BagApp.instance;

        this.BagCellsManager=this.BagCellsManagerNode.getComponent(BagCellsManager);
        this.BagCellsManager.Loading(this.BagApp);

        this.BagPopManager=this.BagPopManagerNode.getComponent(BagPopManager);
        this.BagPopManager.Loading(this.BagApp);
        
        //注入UI引用
        this.BagApp.initEntryUI(this);
    }


    start() {
        console.log("BagEntry: start开始");
        this.LoadComponent();
        
        //告诉App，UI已经初始化完成
        this.BagApp.UILoadOver();

        //对切换武器背包按钮设置点击事件
        this.SwitchWeaponBagBtn.on(Node.EventType.TOUCH_END,()=>{
            console.log("BagEntry: 切换到武器背包");
            this.BagApp.SwitchToWeapon();
        },this);

        //对切换物品背包按钮设置点击事件
        this.SwitchItemBagBtn.on(Node.EventType.TOUCH_END,()=>{
            this.BagApp.SwitchToItem();
        },this);
    }


    //创建面板
    createItemBoxBoard(ItemInfoList){
        this.BagCellsManager.reBuildItemCells(ItemInfoList);
    }
    createWeaponBoxBoard(WeaponInfoList){
        this.BagCellsManager.reBuildWeaponCells(WeaponInfoList);
    }

    //打开弹窗
    openItemPop(StackItem){
        this.BagPopManager.openItemPop(StackItem);

    }

    openWeaponPop(Weapon){
        this.BagPopManager.openWeaponPop(Weapon);
    }


    update(deltaTime: number) {
        // console.log("BagEntry: Hello");
        
    }
}


