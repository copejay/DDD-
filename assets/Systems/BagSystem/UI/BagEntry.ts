import { _decorator, Component, Node, UITransform } from 'cc';
import { Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { ItemPanelEntry } from './Common/ItemPanelEntry';
import { WeaponPanelEntry } from './Common/WeaponPanelEntry';

// import { ChildBoxManager } from './ChildBoxManager';
import { ChildItemBoxManager } from './ChildItemBoxManager';
import { ChildWeaponBoxManager } from './ChildWeaponBoxManager';
//引入管理层
import { BagApp } from '../Application/BagApp';

//Entry应该作为一个系统的入口，但是，一个系统完全可以拥有多个UI管理，比如弹窗
//单独的弹窗完全可以自己管理自己。
//仅仅又入口进行调用就可以了

@ccclass('BagEntry')
export class BagEntry extends Component {
    
    @property({type:Node,tooltip:"物品框板父节点"})
    ItemBoxBoardParentNode:Node=null;

    @property({type:Prefab,tooltip:"物品框板预制体"})
    ItemBoxBoardPrefab:Prefab=null;
    @property({type:Prefab,tooltip:"武器框板预制体"})
    WeaponBoxBoardPrefab:Prefab=null;

    //这个节点需要用来调节大小，才能适应内容的滑动要求
    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;

    @property({type:Node,tooltip:"物品面板"})
    ItemPanel:Node=null;

    @property({type:Node,tooltip:"武器面板"})
    WeaponPanel:Node=null;

    @property({type:Node,tooltip:"切换武器背包的按钮"})
    SwitchWeaponBagBtn:Node=null;

    @property({type:Node,tooltip:"切换物品背包的按钮"})
    SwitchItemBagBtn:Node=null;


    //子类管理器
    ChildItemBoxManager:ChildItemBoxManager=null;
    ChildWeaponBoxManager:ChildWeaponBoxManager=null;



    //App层
    BagApp:BagApp;

    //加载类运行所需的东西
    LoadComponent(){
        console.log("BagEntry: LoadComponent开始");
        //初始化管理层
        this.BagApp=BagApp.instance;
        //初始化UI里面的角色列表管理
        this.ChildItemBoxManager=new ChildItemBoxManager(this.ItemBoxBoardPrefab,this.ItemBoxBoardParentNode,this.ItemBoxClickCallBack);

        this.ChildWeaponBoxManager=new ChildWeaponBoxManager(this.WeaponBoxBoardPrefab,this.ItemBoxBoardParentNode,this.WeaponBoxClickCallBack);

        //注入UI引用
        this.BagApp.initEntryUI(this);
        this.BagApp.initItemPanelUI(this.ItemPanel.getComponent(ItemPanelEntry));
        this.BagApp.initWeaponPanelUI(this.WeaponPanel.getComponent(WeaponPanelEntry));
    }

    onLoad(){
        console.log("BagEntry: onLoad开始");
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




    //箭头函数确保this不丢失
    ItemBoxClickCallBack=(ItemID:string)=>{
        // this.ItemPanelManager.ShowItemPanel(RoleID);
        this.BagApp.clickItemBox(ItemID);
    }

    WeaponBoxClickCallBack=(WeaponID:string)=>{
        // this.ItemPanelManager.ShowItemPanel(RoleID);
        this.BagApp.clickWeaponBox(WeaponID);
    }



    //管理显示视图
    createItemBoxBoard(ItemInfoList){
        this.destroyAllBoard();
        this.ChildItemBoxManager.CreateBoxBoard(ItemInfoList);
        this.resetContentLength();
    }
    createWeaponBoxBoard(WeaponInfoList){
        this.destroyAllBoard();
        this.ChildWeaponBoxManager.CreateBoxBoard(WeaponInfoList);
        this.resetContentLength();
    }


    destroyAllBoard(){
        this.ChildItemBoxManager.DestroyBoxBoard();
        this.ChildWeaponBoxManager.DestroyBoxBoard();
    }

    // destroyItemBoxBoard(){
    //     this.ChildItemBoxManager.DestroyBoxBoard();
    // }
    // destroyWeaponBoxBoard(){
    //     this.ChildWeaponBoxManager.DestroyBoxBoard();
    // }

    resetContentLength(){
        this.ContentNode.getComponent(UITransform).setContentSize(600,this.ChildItemBoxManager.ItemBoxTotalLength);
    }


    update(deltaTime: number) {
        // console.log("BagEntry: Hello");
        
    }
}


