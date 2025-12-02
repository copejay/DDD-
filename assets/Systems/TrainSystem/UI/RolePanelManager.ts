

import { RolePanel } from "./Common/RolePanel";

export class RolePanelManager{

    private RolePanel:RolePanel;
    
    constructor(RolePanel:RolePanel){
        this.RolePanel=RolePanel;
    }

    ShowRolePanel(RoleID){
        this.RolePanel.showRolePanel(RoleID);
    }


}