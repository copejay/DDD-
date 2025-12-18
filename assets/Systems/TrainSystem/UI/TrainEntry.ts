import { _decorator, Component, Node, UITransform } from 'cc';
import { Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { RolePanelEntry } from './Common/RolePanelEntry';

import {RoleBoxManager } from './RoleBoxManager';

//引入管理层
import { TrainApplication } from '../Application/TrainApplication';

//Entry应该作为一个系统的入口，但是，一个系统完全可以拥有多个UI管理，比如弹窗
//单独的弹窗完全可以自己管理自己。
//仅仅又入口进行调用就可以了

@ccclass('TrainEntry')
export class TrainEntry extends Component {
    
    @property({type:Node,tooltip:"角色box父节点"})
    RoleBoxBoardParentNode:Node=null;

    @property({type:Prefab,tooltip:"角色box预制体"})
    RoleBoxBoardPrefab:Prefab=null;

    //这个节点需要用来调节大小，才能适应内容的滑动要求
    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;

    @property({type:Node,tooltip:"角色详情弹窗"})
    RolePanel:Node=null;


    //子类管理器
    RoleBoxManager:RoleBoxManager=null;

    //管理层
    TrainApplication:TrainApplication;

    //加载类运行需要的东西
    LoadComponent(){
        //初始化管理层
        this.TrainApplication=TrainApplication.instance;
        //初始化UI里面的角色列表管理
        this.RoleBoxManager=new RoleBoxManager(this.RoleBoxBoardPrefab,this.RoleBoxBoardParentNode,this.RoleBoxClickCallBack);

        //注入UI引用
        this.TrainApplication.initEntryUI(this);
        this.TrainApplication.initRolePanelUI(this.RolePanel.getComponent(RolePanelEntry));

    }

    start() {
        this.LoadComponent();
        //告诉App，UI已经初始化完成
        this.TrainApplication.UILoadOver();
    }


//类的行为

    //回调函数
    RoleBoxClickCallBack=(RoleID:string)=>{
        this.TrainApplication.clickRoleBox(RoleID);
    }

    //创建角色管理框
    createRoleBoxBoard(RoleInfo){
        this.RoleBoxManager.CreateBoxBoard(RoleInfo);
        this.resetContentLength();
    }
    //销毁旧的角色框板
    destroyRoleBoxBoard(){
        this.RoleBoxManager.DestroyBoxBoard();
    }
    //根据框的长度，调整内容长度，方便滑动
    resetContentLength(){
        this.ContentNode.getComponent(UITransform).setContentSize(600,this.RoleBoxManager.BoxTotalLength);
    }


    update(deltaTime: number) {
        
    }
}


