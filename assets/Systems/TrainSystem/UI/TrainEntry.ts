import { _decorator, Component, Node, UITransform } from 'cc';
import { Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { RolePanel } from './Common/RolePanel';

import { RoleBoxManager } from './RoleBoxManager';
import { RolePanelManager } from './RolePanelManager';

@ccclass('TrainEntry')
export class TrainEntry extends Component {
    
    @property({type:Node,tooltip:"角色框板父节点"})
    RoleBoxBoardParentNode:Node=null;

    @property({type:Prefab,tooltip:"角色框板预制体"})
    RoleBoxBoardPrefab:Prefab=null;

    //这个节点需要用来调节大小，才能适应内容的滑动要求
    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;

    @property({type:Node,tooltip:"角色面板"})
    RolePanel:Node=null;


    //这里是UI入口的管理器，用来管理复杂的UI逻辑
    //首先在infrastructure或者Common里面做出实现，可能通过引擎进行设置
    //一般来说，只有重复的任务才会由infrastructure完成，如果只是使用一次，一般在Common里面由UI层自己完成
    //然后在UI里面进行注入，然后传入给Manager进行管理
    RoleBoxManager:RoleBoxManager=null;

    RolePanelManager:RolePanelManager=null;


    start() {
        //初始化UI里面的角色列表管理
        this.RoleBoxManager=new RoleBoxManager(this.RoleBoxBoardPrefab,this.RoleBoxBoardParentNode,this.RoleBoxClickCallBack);
        //创建角色列表
        this.initRoleBoxManager(38);
        //根据内容重新进行适配
        this.resetContentLength();

        //初始化弹窗管理器，弹窗一开始是隐藏的
        this.RolePanelManager=new RolePanelManager(this.RolePanel.getComponent(RolePanel));
    }


    //箭头函数确保this不丢失
    RoleBoxClickCallBack=(RoleID:string)=>{
        this.RolePanelManager.ShowRolePanel(RoleID);
    }

    initRoleBoxManager(BoxNum:number){
        this.RoleBoxManager.CreateRoleBoxBoard(BoxNum);
    }

    resetContentLength(){
        this.ContentNode.getComponent(UITransform).setContentSize(600,this.RoleBoxManager.RoleBoxTotalLength);
    }


    update(deltaTime: number) {
        
    }
}


