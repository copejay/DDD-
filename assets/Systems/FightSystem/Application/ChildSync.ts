


export class ChildSync{


    private FightRoleManager;
    private FightRoleViewList=[];

    private FightBoxViewList=[];

    private BoardNode;

    private FightBoxFactory;
    private FightRoleFactory;

    private InitOver:boolean=false;

    // private BoardBoxInit:boolean=false;

    constructor(FightRoleManager,FightRoleFactory,FightBoxFactory,BoardNode){
        //传入基础设施
        this.FightRoleManager=FightRoleManager;
        this.FightRoleFactory=FightRoleFactory;
        this.FightBoxFactory=FightBoxFactory;

        this.BoardNode=BoardNode;
        //建立BoxView列表
        this.createBoxViewList();

        //建立View列表
        this.createRoleViewList();

        //准备完毕，update开始同步
        this.InitOver=true;

        this.OnceSyncBox();


    }


    createRoleViewList(){
        let TotalLength=this.FightRoleManager.LeftRoleNum+this.FightRoleManager.RightRoleNum;
        for(let i=0;i<TotalLength;i++){
            let fightRoleView=this.FightRoleFactory.get(this.BoardNode);
            this.FightRoleViewList.push(fightRoleView);
        }
    }

    createBoxViewList(){
        let TotalLength=18;
        for(let i=0;i<TotalLength;i++){
            let fightBoxView=this.FightBoxFactory.get(this.BoardNode);
            this.FightBoxViewList.push(fightBoxView);
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

    checkViewNum(){
        let TotalLength=this.FightRoleManager.LeftRoleNum+this.FightRoleManager.RightRoleNum;
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

    
    OnceSyncBox(){
        for(let i=0;i<9;i++){
            let fightBoxView=this.FightBoxViewList[i];
            let fightBox=this.FightRoleManager.RightBoxList[i];
            fightBoxView.syncPosition(fightBox.x,fightBox.y);
            console.log(`Box位置同步: 次数${i},位置${fightBox.x},${fightBox.y}`)
        }
        for(let i=0;i<9;i++){
            let fightBoxView=this.FightBoxViewList[i+9];
            let fightBox=this.FightRoleManager.LeftBoxList[i];
            fightBoxView.syncPosition(fightBox.x,fightBox.y);
        }
        // this.BoardBoxInit=true;
    }


    SyncRun(){
        this.checkViewNum();
        let TotalLength=this.FightRoleManager.LeftRoleNum+this.FightRoleManager.RightRoleNum;
        // console.log(`Role总长度：${TotalLength}`);
        // console.log(`View长度:${this.FightRoleViewList.length}`);
        for(let i=0;i<TotalLength;i++){
            let fightRole;
            // console.log(`num:${i}`);
            if(i<this.FightRoleManager.LeftRoleNum){
                fightRole=this.FightRoleManager.BoardLeftRole[i];
                // console.log(fightRole);
            }else{
                fightRole=this.FightRoleManager.BoardRightRole[i-this.FightRoleManager.LeftRoleNum];
            }

            let FightRoleView=this.FightRoleViewList[i];
            // console.log(`ChildSync:执行num-${i}`);
            FightRoleView.syncPosition(fightRole.x,fightRole.y);
            FightRoleView.setName(fightRole.name);
            FightRoleView.setLevel(fightRole.level);
        }
    }

    update(dt){
        // if(this.BoardBoxInit==false){
        //     this.OnceSyncBox();
        // }
        if(this.InitOver==true){
            this.SyncRun();
        }

    }
}