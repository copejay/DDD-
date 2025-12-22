
import { RolePanelData } from "../../Domain/RolePanelData";


//处理角色弹窗的逻辑
export class RolePanel{

    DataBaseService;

    RolePanelData;

    TrainEntryUI;


    constructor(DataBaseService,TrainEntryUI){
        this.DataBaseService=DataBaseService;
        this.TrainEntryUI=TrainEntryUI;
    }

    //角色面板
    createRolePanelData(RoleID:string){
        let RoleInfo=this.getRoleInfoByID(RoleID);
        if(RoleInfo){
            this.RolePanelData=new RolePanelData(RoleInfo);
        }
    }

    closeRolePanel(){
        
    }

    SaveRolePanelData(){
        let RoleData=this.RolePanelData.export();
        this.DataBaseService.setRole(RoleData);
    }

    openRolePanel(RoleID:string){
        this.createRolePanelData(RoleID);

        this.TrainEntryUI.openRolePanel(this.RolePanelData);
    }


    getRoleInfoByID(RoleID:string){
        return this.DataBaseService.getRole(RoleID);
    }

}