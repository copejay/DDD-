
import { FightBoardSite } from "./FightBoardSite";
import { FightRole } from "./FightRole";
// import { FightBox } from "./FightBox";


export class FightRoleManager{

    private FightBoardSite:FightBoardSite;

    private RoleList:FightRole[]=[];

    private ActionRoleList:FightRole[]=[];

    // BoardRoleMap:{}={};

    // dtTime=1;
    Lose:boolean=false;


    constructor(){
        this.FightBoardSite=new FightBoardSite();
    }

    // initFightBoard(){
    //     this.FightBoard=new FightBoard();
    // }

    getRoleList(){
        return this.RoleList;
    }

    cleanRoleList(){
        this.RoleList=[];
    }


    LoadFightInfoList(FightInfoList){
        // this.initFightBoard();
        this.cleanRoleList();
        FightInfoList.forEach((Info)=>{
            this.LoadFightInfo(Info);
        })
        this.Lose=false;

    }


    LoadFightInfo(FightInfo){
        // this.initFightBoard();
        let RoleName=FightInfo.name;
        let RoleSpeed=FightInfo.speed;
        let RoleAttack=FightInfo.attack;
        let RoleDefense=FightInfo.defense;
        let RoleHP=FightInfo.hp;

        let RoleBoardSite={x:FightInfo.site.x,y:FightInfo.site.y};
        let RoleSite=this.FightBoardSite.getSite(RoleBoardSite);

        console.log(`FightRoleManager:从FightBoard获得RoleSite:${RoleSite}`);

        let newRole=new FightRole();
        newRole.setBaseInfo(RoleName,1);
        newRole.setFightInfo(RoleSpeed,RoleAttack,RoleDefense,RoleHP);
        newRole.setSite(RoleSite[0],RoleSite[1]);

        this.RoleList.push(newRole);
    }

    async Action(getDefenseList:(range:number)=>FightRole[]){
        console.log("B_FightRoleManager");
        console.log(`Action`);
        for (const role of this.RoleList){
            await role.Action(getDefenseList);
        }
    }

    checkLose(){
        if(this.RoleList.length==0){
            this.Lose=true;
        }
    }


    checkDied(){
        for(let i=this.RoleList.length-1;i>=0;i--){
            if(this.RoleList[i].died==true){
                this.RoleList.splice(i,1);
            }
        }
        // this.RoleList.forEach((role)=>{
        //     if(role.died==true){
        //         this.RoleList.splice(this.RoleList.indexOf(role),1);
        //     }
        // })
    }


    getDefenseList(){
        return this.RoleList;

    }


}