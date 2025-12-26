

import { DataBaseService } from "../../GlobalService";
// import { TemplateService } from "../../GlobalService";
import { HintPopApp } from "../../HintPopSystem/Application/HintPopApp";


import { RolePanel } from "./Assistant/RolePanel";
import { RoleBoxList } from "./Assistant/RoleBoxList";
import {FormationPop} from './Assistant/FormationPop';
import { HintPop } from "../../HintPopSystem/Domain/HintPop";


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


    //内部子类管理器
    private RolePanel:RolePanel;
    private RoleBoxList:RoleBoxList;
    private FormationPop:FormationPop;

    //存储列阵角色id
    // private ChooseRoleID:string;


    //提供给外部调用的方法
    clickRoleBox(RoleID:string){
        console.log("TrainApplication: 点击角色框",RoleID);
        this.RolePanel.openRolePanel(RoleID);
    }
    UILoadOver(){
        console.log("TrainApplication: UI 加载完毕");
        this.RoleBoxList.reBuildBoard();
    }
    UpFormationClick(RoleID:string){
        this.FormationPop.setChooseRoleID(RoleID);
        this.FormationPop.openFormationPop();
    }
    DownRoleClick(){
        let HadDown=this.FormationPop.DownRoleClick();
        if(HadDown==true){
            HintPopApp.instance.createHintPop("角色已下阵");
        }else if(HadDown==false){
            HintPopApp.instance.createHintPop("该角色未在阵容中！");
        }
        this.RoleBoxList.reBuildBoard();
    }
    FormationCellClick(CellID){
        this.FormationPop.FormationCellClick(CellID);
        this.RoleBoxList.reBuildBoard();
    }



    //注入App运行需要的东西
    initEntryUI(TrainUI){
        this.TrainEntryUI=TrainUI;
        this.OutLoadOver();
    }

    OutLoadOver(){
            this.initChildBoxBoard();
            this.initChildRolePanel();
            this.initChildFormationCells();
    }

    //组建内部子类管理器
    initChildRolePanel(){
        this.RolePanel=new RolePanel(this.DataBaseService,this.TrainEntryUI);
    }
    initChildBoxBoard(){
        this.RoleBoxList=new RoleBoxList(this.DataBaseService,this.TrainEntryUI);
    }
    initChildFormationCells(){
        this.FormationPop=new FormationPop(this.TrainEntryUI,HintPopApp.instance,this.DataBaseService);
    }


}