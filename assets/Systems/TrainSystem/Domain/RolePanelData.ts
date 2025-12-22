
type RoleRow={
    id:string;
    name:string;
    templateID:string;
    level:number;
    exp:number;
}

export class RolePanelData{

    // RoleId:string;
    // RoleName:string;
    // RoleTemplateID:string;
    // RoleLevel:number;
    // RoleExp:number;
    id:string;
    name:string;
    templateID:string;
    level:number;
    exp:number;


    constructor(RoleInfo:RoleRow){
        this.analyzeRoleInfo(RoleInfo);
    }

    analyzeRoleInfo(RoleInfo){
        // this.RoleId=RoleInfo.id;
        // this.RoleName=RoleInfo.name;
        // this.RoleTemplateID=RoleInfo.templateID;
        // this.RoleLevel=RoleInfo.level;
        // this.RoleExp=RoleInfo.exp;
        this.id=RoleInfo.id;
        this.name=RoleInfo.name;
        this.templateID=RoleInfo.templateID;
        this.level=RoleInfo.level;
        this.exp=RoleInfo.exp;
    }

    setName(RoleName:string){
        this.name=RoleName;
    }

    addLevel(AddLevel:number){
        this.level+=AddLevel;
    }

    addExp(AddExp:number){
        this.exp+=AddExp;
    }

    export(){
        // let RoleInfo:RoleRow={
        //     id:this.RoleId,
        //     name:this.RoleName,
        //     templateID:this.RoleTemplateID,
        //     level:this.RoleLevel,
        //     exp:this.RoleExp,
        // }
        let RoleInfo:RoleRow={
            id:this.id,
            name:this.name,
            templateID:this.templateID,
            level:this.level,
            exp:this.exp,
        }
        return RoleInfo;
    }

}