

import { DataBaseService } from "../../GlobalService";

import { RolePanelData } from "../Domain/RolePanelData";

import { ChildRolePanel } from "./ChildRolePanel";
import { ChildBoxBoard } from "./ChildBoxBoard";

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

    //外部注入
    private DataBaseService:DataBaseService;//数据服务
    private TrainEntryUI=null;//训练入口UI
    private RolePanelUI=null;//角色弹窗UI

    //数据体
    private RolePanelData:RolePanelData;

    //内部子类管理器
    private ChildRolePanel:ChildRolePanel;
    private ChildBoxBoard:ChildBoxBoard;


    //提供给外部调用的方法
    clickRoleBox(RoleID:string){
        console.log("TrainApplication: 点击角色框",RoleID);
        this.ChildRolePanel.openRolePanel(RoleID);
    }
    UILoadOver(){
        console.log("TrainApplication: UI 加载完毕");
        this.ChildBoxBoard.syncTrainRole();
    }


    //注入App运行需要的东西
    initRolePanelUI(RolePanelUI){
        this.RolePanelUI=RolePanelUI;
        // this.initChildRolePanel();
        this.checkOutLoadOver();
    }
    initEntryUI(TrainUI){
        this.TrainEntryUI=TrainUI;
        // this.initChildBoxBoard();
        this.checkOutLoadOver();
    }


    checkOutLoadOver(){
        if(this.TrainEntryUI==null || this.RolePanelUI==null){
            console.log("TrainApplication: 资源加载中");
            return;
        }else{
            this.initChildBoxBoard();
            this.initChildRolePanel();
        }
    }

    //组建内部子类管理器
    initChildRolePanel(){
        this.ChildRolePanel=new ChildRolePanel(this.DataBaseService,this.RolePanelUI);
    }
    initChildBoxBoard(){
        this.ChildBoxBoard=new ChildBoxBoard(this.DataBaseService,this.TrainEntryUI);
    }

    //接收UI注入
    //训练界面入口UI
    // initEntryUI(TrainUI){
    //     this.TrainEntryUI=TrainUI;
    //     this.initChildBoxBoard();
    // }
    //子角色面板板
    // initChildBoxBoard(){
    //     this.ChildBoxBoard=new ChildBoxBoard(this.DataBaseService,this.TrainEntryUI);
    // }


}