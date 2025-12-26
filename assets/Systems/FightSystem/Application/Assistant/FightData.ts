

interface FightFormation{
    LeftFightInfo:{}[];
    RightFightInfo:{}[];
}

    let RightFightInfo:[
        {name:"猛虎王",speed:100,attack:5000,defense:200,hp:105000,site:{x:1,y:3}},
        {name:"哈吉米",speed:100,attack:12000,defense:100,hp:100000,site:{x:2,y:2}}]

// let SiteList=[{x:-1,y:1},{x:-1,y:2},{x:-1,y:3},{x:-2,y:2},{x:-2,y:1}]

export class FightData{

    DataBaseService;

    FightFormation:FightFormation={
        LeftFightInfo:[],
        RightFightInfo:[]
    };

    constructor(DataBaseService){
        this.DataBaseService=DataBaseService;
    }

    cleanFormation(){
        this.FightFormation.LeftFightInfo=[];
        this.FightFormation.RightFightInfo=[];
    }

    DataOk(){
        let Formation=this.DataBaseService.getFormation();
        if(Formation.length>0 && Formation.length<=5){
            return true;
        }else{
            return false;
        }
    }

    GetRoleNameById(id){
        let RoleName=this.DataBaseService.getRole(id).baseInfo.name;
        return RoleName;
    }

    getFormation(){
        this.cleanFormation();
        
        let Formation=this.DataBaseService.getFormation();
        for(let i=0;i<Formation.length;i++){
            let FightRole=Formation[i];
            let RoleID=FightRole.id;
            let RoleSite={x:FightRole.site.x,y:FightRole.site.y};

            let RoleName=this.GetRoleNameById(RoleID);
          
            let newFightRole={name:RoleName,speed:100,attack:11900,defense:200,hp:85000,site:RoleSite,classType:"修真者"}

            this.FightFormation.LeftFightInfo.push(newFightRole);
        }
        this.FightFormation.RightFightInfo=[
        {name:"猛虎王",speed:100,attack:3200,defense:200,hp:150000,site:{x:1,y:3},classType:"骑士"},
        {name:"哈吉米",speed:100,attack:12900,defense:100,hp:100000,site:{x:2,y:2},classType:"骑士"}];
        console.log(`ChildFightData getFormation`,this.FightFormation);
        return this.FightFormation;
    }

}