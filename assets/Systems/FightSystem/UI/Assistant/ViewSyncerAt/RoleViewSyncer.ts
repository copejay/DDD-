

export class RoleViewSyncer{

    // private FightManager;

    private FightRoleList;

    private FightRoleViewList=[];

    private FightRoleFactory;

    private BoardNode;

    get RoleList(){
        return this.FightRoleList;
    }

    constructor(FightRoleFactory,BoardNode){
        // this.FightManager=FightManager;
        this.FightRoleFactory=FightRoleFactory;
        this.BoardNode=BoardNode;
    }

    // buildRoleList(){
    //     // this.FightRoleList=this.FightManager.exportRoleList();
    //     // this.InitOver=true;
    // }

    //角色运行
    // Update(dt:number){
    //     this.FightRoleList.forEach((role)=>{
    //         role.update(dt);
    //     })
    // }


    Sync(FightRoleList){
        this.FightRoleList=FightRoleList;
        this.SyncRole();
    }


    //角色视图数量
    checkRoleViewNum(){
        // this.FightRoleList=this.FightManager.exportRoleList();

        let TotalLength=this.FightRoleList.length;

        let ViewLength=this.FightRoleViewList.length;
        let Num=TotalLength-ViewLength;
        if(Num==0){
            return
        }else if(Num<0){
            this.deleteRoleView(-Num);
        }else if(Num>0){
            this.addRoleView(Num);
        }
    }
    addRoleView(Num){
        for(let i=0;i<Num;i++){
            let fightRoleView=this.FightRoleFactory.get(this.BoardNode);
            this.FightRoleViewList.push(fightRoleView);
        } 
    }
    deleteRoleView(Num){
        for(let i=0;i<Num;i++){
            let view=this.FightRoleViewList.pop();
            this.FightRoleFactory.recycle(view);
        }  
    }

    //同步角色
    SyncRole(){
        this.checkRoleViewNum();
        let TotalLength=this.FightRoleList.length;
        for(let i=0;i<TotalLength;i++){
            let fightRoleView=this.FightRoleViewList[i];
            let fightRole=this.FightRoleList[i];

            fightRoleView.syncPosition(fightRole.x,fightRole.y);
            fightRoleView.syncHpBar(fightRole.Hp,fightRole.maxHp);
            fightRoleView.setName(fightRole.name);
            fightRoleView.setLevel(fightRole.level);
            fightRoleView.syncVisual(fightRole.classType,fightRole.side);
        }
    }

}