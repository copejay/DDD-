import { _decorator, Component, Node, UITransform } from 'cc';
import { Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { ItemPanelEntry } from './Common/ItemPanelEntry';

// import { ChildBoxManager } from './ChildBoxManager';
import { ChildBoxManager } from './ChildBoxManager';
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

    //这个节点需要用来调节大小，才能适应内容的滑动要求
    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;

    @property({type:Node,tooltip:"物品面板"})
    ItemPanel:Node=null;

    //子类管理器
    ChildBoxManager:ChildBoxManager=null;

    //App层
    BagApp:BagApp;

    //加载类运行所需的东西
    LoadComponent(){
        //初始化管理层
        this.BagApp=BagApp.instance;
        //初始化UI里面的角色列表管理
        this.ChildBoxManager=new ChildBoxManager(this.ItemBoxBoardPrefab,this.ItemBoxBoardParentNode,this.RoleBoxClickCallBack);

        //注入UI引用
        this.BagApp.initEntryUI(this);
        this.BagApp.initItemPanelUI(this.ItemPanel.getComponent(ItemPanelEntry));
    }


    start() {
        // //初始化管理层
        // this.BagApp=BagApp.instance;
        // //初始化UI里面的角色列表管理
        // this.ChildBoxManager=new ChildBoxManager(this.ItemBoxBoardPrefab,this.ItemBoxBoardParentNode,this.RoleBoxClickCallBack);

        // //注入UI引用
        // this.BagApp.initEntryUI(this);
        // this.BagApp.initItemPanelUI(this.ItemPanel.getComponent(ItemPanelEntry));
        this.LoadComponent();
        
        //告诉App，UI已经初始化完成
        this.BagApp.UILoadOver();
    }


    //箭头函数确保this不丢失
    RoleBoxClickCallBack=(ItemID:string)=>{
        // this.ItemPanelManager.ShowItemPanel(RoleID);
        this.BagApp.clickItemBox(ItemID);
    }


    //管理显示视图
    createItemBoxBoard(ItemInfoList){
        this.ChildBoxManager.CreateBoxBoard(ItemInfoList);
        this.resetContentLength();
    }
    destroyRoleBoxBoard(){
        this.ChildBoxManager.DestroyItemBoxBoard();
    }
    resetContentLength(){
        this.ContentNode.getComponent(UITransform).setContentSize(600,this.ChildBoxManager.ItemBoxTotalLength);
    }


    update(deltaTime: number) {
        
    }
}


