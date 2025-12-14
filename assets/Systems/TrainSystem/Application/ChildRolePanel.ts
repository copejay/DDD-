
import { RolePanelData } from "../Domain/RolePanelData";


//处理角色弹窗的逻辑
export class ChildRolePanel{

    DataBaseService;

    RolePanelData;

    RolePanelUI;


    constructor(DataBaseService,RolePanelUI){
        this.DataBaseService=DataBaseService;
        this.RolePanelUI=RolePanelUI;
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

        this.RolePanelUI.showRolePanel();
        this.RolePanelUI.syncRoleInfo(this.RolePanelData.RoleName,this.RolePanelData.RoleLevel,this.RolePanelData.RoleExp);
    }


    getRoleInfoByID(RoleID:string){
        return this.DataBaseService.getRole(RoleID);
    }

}