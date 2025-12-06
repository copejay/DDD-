
import type { RoleRow } from "../../GlobalService";

import { DataBaseService } from "../../GlobalService";

export class TrainApplication{

    private static _instance:TrainApplication;

    public static get instance(){
        if(!this._instance){
            this._instance=new TrainApplication();
        }
        return this._instance;
    }

    constructor(){
        this.DataBaseService=DataBaseService.instance;
    }

    //全局数据服务
    private DataBaseService:DataBaseService;

    private TrainUI;

    // private RoleInfoList:RoleRow[];

    /**
     * 初始化角色信息列表
     */
    getRoleInfoList(){
        return this.DataBaseService.getAllRole();
    }

    //和UI层交互区
    initUI(TrainUI){
        this.TrainUI=TrainUI;
    }

    UILoadOver(){
        console.log("TrainApplication: UI 加载完毕");
        this.syncTrainRole();
    }

    //同步训练角色
    syncTrainRole(){
        //初始化角色信息列表
        let RoleInfoList=this.getRoleInfoList();
        this.TrainUI.createRoleBoxBoard(RoleInfoList);
        // //初始化角色框板
        // this.TrainUI.initRoleBoxManager(RoleInfoList.length);
        // //同步角色信息列表
        // this.TrainUI.syncRoleBoxList(RoleInfoList);
    }


}