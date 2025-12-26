import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import { RolePanelEntry } from './Assistant/RolePanelEntry';
import { TrainResourceNode } from './Assistant/TrainResourceNode';
import { FormationPop } from './Assistant/FormationPop';

import {RoleBoxManager } from './Assistant/RoleBoxManager';
//引入管理层
import { TrainApplication } from '../Application/TrainApplication';

import { RoleRow } from '../../GlobalService';


@ccclass('TrainEntry')
export class TrainEntry extends Component {
    
    @property({type:TrainResourceNode,tooltip:"资源节点"})
    ResourceNode:TrainResourceNode=null;

    @property({type:Node,tooltip:"角色详情弹窗"})
    RolePanelNode:Node=null;

    @property({type:FormationPop,tooltip:"阵型弹窗"})
    FormationPopNode:FormationPop=null;
    //子类管理器
    RoleBoxManager:RoleBoxManager=null;
    RolePanel:RolePanelEntry=null;
    FormationPop:FormationPop=null;
    //管理层
    TrainApplication:TrainApplication;

    //加载类运行需要的东西
    LoadComponent(){
        let RoleBoxBoardParentNode=this.ResourceNode.getBoxParentNode();
        let RoleBoxBoardPrefab=this.ResourceNode.getBoxPrefab();

        this.RoleBoxManager=new RoleBoxManager(RoleBoxBoardPrefab,RoleBoxBoardParentNode,this.RoleBoxClickCallBack);

        this.RolePanel=this.RolePanelNode.getComponent(RolePanelEntry);
        this.RolePanel.initEventBus(this.AssistantCB);

        this.FormationPop=this.FormationPopNode.getComponent(FormationPop);
        this.FormationPop.initEventBus(this.AssistantCB);
    }
    LoadApp(){
        //初始化管理层
        this.TrainApplication=TrainApplication.instance;
        //注入UI引用
        this.TrainApplication.initEntryUI(this);
    }

    start() {
        this.LoadComponent();
        this.LoadApp();
        //告诉App，UI已经初始化完成
        this.TrainApplication.UILoadOver();
    }

    EventBus(event){
        if(event.callFrom=="RolePanelEntry"){
            if(event.type=="UpFormationClick"){
                this.TrainApplication.UpFormationClick(event.data.id);
            }
        }
        else if(event.callFrom=="FormationPopClick"){
            if(event.type=="ClickCell"){
                console.log(`TrainEntry: FormationPopClick${event.data.id}`);
                this.TrainApplication.FormationCellClick(event.data.id);
            }else if(event.type=="CleanFormation"){
                console.log("hahaha");
            }else if(event.type=="DownRole"){
                this.TrainApplication.DownRoleClick();
            }
        }
        else{
            console.error(`TrainEntry:未知来源信息${event.callFrom}`);
        }
    }

    AssistantCB=(message)=>{
        this.EventBus(message);
    }


//类的行为
    //回调函数
    RoleBoxClickCallBack=(RoleID:string)=>{
        this.TrainApplication.clickRoleBox(RoleID);
    }

    //创建角色管理框
    reBuildBoxBoard(RoleInfo:RoleRow[],upList){
        this.RoleBoxManager.reBuildBoxBoard(RoleInfo,upList);
        this.resetContentLength();
    }
    //根据框的长度，调整内容长度，方便滑动
    resetContentLength(){
        let ContentNode=this.ResourceNode.getContentNode();
        ContentNode.getComponent(UITransform).setContentSize(600,this.RoleBoxManager.BoxTotalLength);
    }
    openRolePanel(RolePanelData:RoleRow){
        this.RolePanel.open();
        this.RolePanel.setRoleID(RolePanelData.id);
        this.RolePanel.syncInfo(RolePanelData.baseInfo.name,RolePanelData.baseInfo.level,RolePanelData.baseInfo.exp);
    }
    openFormationPop(FormationDisplayInfo:[{name:string,site:{x:number,y:number}}]){
        this.FormationPop.open();
        this.FormationPop.syncRoleCellsInfo(FormationDisplayInfo)
    }


    update(deltaTime: number) {
        
    }
}


