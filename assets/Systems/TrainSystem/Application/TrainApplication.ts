

import { DataBaseService } from "../../GlobalService";

// import { RolePanelData } from "../Domain/RolePanelData";

// import { ChildRolePanel } from "./ChildRolePanel";
// import { ChildBoxBoard } from "./ChildBoxBoard";
import { RolePanel } from "./Assistant/RolePanel";
import { RoleBoxList } from "./Assistant/RoleBoxList";


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
    // private RolePanelUI=null;//角色弹窗UI

    // //数据体
    // private RolePanelData:RolePanelData;

    //内部子类管理器
    // private ChildRolePanel:ChildRolePanel;
    // private ChildBoxBoard:ChildBoxBoard;
    private RolePanel:RolePanel;
    private RoleBoxList:RoleBoxList;


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
        console.log("TrainApplication: 角色上阵",RoleID);
        let formation=this.DataBaseService.getFormation();
        let HadUp=false;
        formation.forEach((role)=>{
            if(role.id==RoleID){
                HadUp=true;
            }
        })
        if(HadUp==false){
            formation.push({id:RoleID,site:{x:-1,y:2}});
        }
        this.DataBaseService.setFormation(formation);
        
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
    }

    //组建内部子类管理器
    initChildRolePanel(){
        this.RolePanel=new RolePanel(this.DataBaseService,this.TrainEntryUI);
    }
    initChildBoxBoard(){
        this.RoleBoxList=new RoleBoxList(this.DataBaseService,this.TrainEntryUI);
    }


}