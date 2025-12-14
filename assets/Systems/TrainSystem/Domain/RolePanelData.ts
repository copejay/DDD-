
type RoleRow={
    id:string;
    name:string;
    templateID:string;
    level:number;
    exp:number;
}

export class RolePanelData{

    RoleId:string;
    RoleName:string;
    RoleTemplateID:string;
    RoleLevel:number;
    RoleExp:number;


    constructor(RoleInfo:RoleRow){
        this.analyzeRoleInfo(RoleInfo);
    }

    analyzeRoleInfo(RoleInfo){
        this.RoleId=RoleInfo.id;
        this.RoleName=RoleInfo.name;
        this.RoleTemplateID=RoleInfo.templateID;
        this.RoleLevel=RoleInfo.level;
        this.RoleExp=RoleInfo.exp;
    }

    setName(RoleName:string){
        this.RoleName=RoleName;
    }

    addLevel(AddLevel:number){
        this.RoleLevel+=AddLevel;
    }

    addExp(AddExp:number){
        this.RoleExp+=AddExp;
    }

    export(){
        let RoleInfo:RoleRow={
            id:this.RoleId,
            name:this.RoleName,
            templateID:this.RoleTemplateID,
            level:this.RoleLevel,
            exp:this.RoleExp,
        }
        return RoleInfo;
    }

}