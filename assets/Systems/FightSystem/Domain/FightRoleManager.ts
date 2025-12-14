
import { FightBoard } from "./FightBoard";
import { FightRole } from "./FightRole";
import { FightBox } from "./FightBox";


export class FightRoleManager{

    FightBoard:FightBoard;

    RightBoxList:FightBox[]=[];
    LeftBoxList:FightBox[]=[];

    BoardRightRole:FightRole[]=[];
    BoardLeftRole:FightRole[]=[];

    RightRoleNum:number;
    LeftRoleNum:number;

    BoardRoleList:FightRole[]=[];

    BoardRoleMap:{}={};

    dtTime=1;

    constructor(){
        this.initFightBoard();
        this.initBoxList();
        this.initRoleList();
    }

    initFightBoard(){
        this.FightBoard=new FightBoard();
    }

    initRoleList(){
        console.log("FightRoleManager:RoleList初始化");
        // this.FightBoard=new FightBoard();

        let RightSiteList=this.FightBoard.BoxSiteList.right;
        let LeftSiteList=this.FightBoard.BoxSiteList.left;

        this.BoardRightRole=this.getRoleList(RightSiteList);
        this.BoardLeftRole=this.getRoleList(LeftSiteList);

        this.CreateMap('right',this.BoardRightRole);
        this.CreateMap('left',this.BoardLeftRole);
        // console.log(`字典：${this.BoardRoleMap['right']['1'].name}`);

        this.RightRoleNum=this.BoardRightRole.length;
        this.LeftRoleNum=this.BoardLeftRole.length;
    }

    initBoxList(){
        let RightBoxList=this.getBoxList(this.FightBoard.BoxSiteList.right);
        let LeftBoxList=this.getBoxList(this.FightBoard.BoxSiteList.left);
        this.RightBoxList=RightBoxList;
        this.LeftBoxList=LeftBoxList;
    }


    CreateMap(MapName:string,RoleList){
        let littleMap={};
        for(let i=0;i<RoleList.length;i++){
            let key=`${i}`;
            littleMap[key]=RoleList[i];
        }
        this.BoardRoleMap[MapName]=littleMap;
    }


    getBoxList(SiteList){
        let BoxList=[];
        SiteList.forEach((site)=>{
            let newBox=new FightBox(site[0],site[1]);
            BoxList.push(newBox);
        });
        return BoxList;
    }


    getRoleList(SiteList){
        let RoleList=[];
        SiteList.forEach((site)=>{
            let newRole=new FightRole(site[0],site[1]);
            RoleList.push(newRole);
        });
        return RoleList;
    }


    update(dt){
        this.dtTime-=dt;
        // console.log(`时间帧：${dt}`);
        if(this.dtTime<=0){
            console.log("2秒到达");
            // console.log(`RoleManager:调用移动`);
            this.BoardRoleMap['right']['1'].attackMove(500,0);
            this.dtTime=2;
        }
        this.BoardLeftRole.forEach((role)=>{
            role.update(dt);
        })
        this.BoardRightRole.forEach((role)=>{
            role.update(dt);
        })

    }


}