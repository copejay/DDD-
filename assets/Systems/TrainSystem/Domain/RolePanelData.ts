
type RoleRow={
    id:string;
    baseInfo:{
        name:string;
        level:number;
        exp:number;
    },
    equipList:[{id:string,up:boolean}];
    skillList:[{id:string,up:boolean}];
    // name:string;
    // templateID:string;
    // level:number;
    // exp:number;
}

export class RolePanelData{

    // RoleId:string;
    // RoleName:string;
    // RoleTemplateID:string;
    // RoleLevel:number;
    // RoleExp:number;
    id:string;
    baseInfo:{
        name:string;
        level:number;
        exp:number;
    };
    equipList:[{id:string,up:boolean}];
    skillList:[{id:string,up:boolean}];
    // name:string;
    // templateID:string;
    // level:number;
    // exp:number;


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
        this.baseInfo=RoleInfo.baseInfo;
        this.equipList=RoleInfo.equipList;
        this.skillList=RoleInfo.skillList;
        // this.name=RoleInfo.name;
        // this.templateID=RoleInfo.templateID;
        // this.level=RoleInfo.level;
        // this.exp=RoleInfo.exp;
    }

    setName(RoleName:string){
        this.baseInfo.name=RoleName;
    }

    addLevel(AddLevel:number){
        this.baseInfo.level+=AddLevel;
    }

    addExp(AddExp:number){
        this.baseInfo.exp+=AddExp;
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
            baseInfo:this.baseInfo,
            equipList:this.equipList,
            skillList:this.skillList,
        }
        return RoleInfo;
    }

}