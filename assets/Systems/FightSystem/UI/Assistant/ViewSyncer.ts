
import {RoleViewSyncer} from './ViewSyncerAt/RoleViewSyncer';
import { HitEffectSyncer } from './ViewSyncerAt/HintEffectSyncer';

export class ViewSyncer{


    // private FightManager;

    //数据体列表
    private FloatingTextList=[];
    //视图列表
    private FightBoxViewList=[];
    private FloatingTextViewList=[];

    private BoardNode;
    //视图工厂列表
    private FightBoxFactory;
    private FightRoleFactory;
    private FloatingTextFactory;
    private HitEffectFactory;

    //数据体和视图，构建完成
    // private InitOver:boolean=false;

    private RoleAt:RoleViewSyncer;
    private HitEffectAt:HitEffectSyncer;

    constructor(FightRoleFactory,FloatingTextFactory,FightBoxFactory,HitEffectFactory,BoardNode){
        //传入数据体
        // this.FightManager=FightManager;
       //传入工厂
        this.FightRoleFactory=FightRoleFactory;
        this.FloatingTextFactory=FloatingTextFactory;
        this.FightBoxFactory=FightBoxFactory;
        this.HitEffectFactory=HitEffectFactory;
        this.BoardNode=BoardNode;

        this.RoleAt=new RoleViewSyncer(this.FightRoleFactory,this.BoardNode);
        this.HitEffectAt=new HitEffectSyncer(this.BoardNode,this.HitEffectFactory,this.RoleAt);

        this.BuildBoardView();
        // this.SyncBoardCell();
    }

//核心方法
    // BeginSyncRole(){
    //     // this.RoleAt.buildRoleList();
    //     // this.FightRoleList=this.FightManager.exportRoleList();
    //     this.InitOver=true;
    // }


    sync(FightRoleList,HitEffectList,BoardBoxList){
        console.log(`Fight-UI-ViewSyncer: 接收同步信息，开始同步`);
        // if(this.InitOver==true){
            this.SyncBoardCell(BoardBoxList);
            // this.RoleAt.Update(dt);
            this.RoleAt.Sync(FightRoleList);
            this.SyncFloatingText();
            this.HitEffectAt.Sync(HitEffectList);
        // }
    }
    
//棋盘创建
    //创建棋盘box视图
    BuildBoardView(){
        let TotalLength=18;
        // let TotalLength=this.FightRoleList.length;
        for(let i=0;i<TotalLength;i++){
            let fightBoxView=this.FightBoxFactory.get(this.BoardNode);
            this.FightBoxViewList.push(fightBoxView);
        }
    }

    //同步棋盘box
    SyncBoardCell(BoardBoxList){
        // let BoardBoxList=this.FightManager.exportBoardBoxList();
        let TotalLength=BoardBoxList.length;
        for(let i=0;i<TotalLength;i++){
            let fightBoxView=this.FightBoxViewList[i];
            let fightBox=BoardBoxList[i];
            fightBoxView.syncPosition(fightBox.x,fightBox.y);
        }
    }

//视图数量管理方法
 

    //对齐浮空特效视图
    checkFloatingTextViewNum(){
        let TotalLength=this.FloatingTextList.length;

        let ViewLength=this.FloatingTextViewList.length;
        let Num=TotalLength-ViewLength;
        if(Num==0){
            return
        }else if(Num<0){
            this.deleteFloatingTextView(-Num);
        }else if(Num>0){
            this.addFloatingTextView(Num);
        }
    }
    addFloatingTextView(Num){
        for(let i=0;i<Num;i++){
            let floatingTextView=this.FloatingTextFactory.get(this.BoardNode);
            this.FloatingTextViewList.push(floatingTextView);
        } 
    }
    deleteFloatingTextView(Num){
        for(let i=0;i<Num;i++){
            let view=this.FloatingTextViewList.pop();
            this.FloatingTextFactory.recycle(view);
        }  
    }


    //同步浮空特效
    SyncFloatingText(){
        let newFloatingTextList=[];
        // this.FightRoleList.forEach((role)=>{
        this.RoleAt.RoleList.forEach((role)=>{
            if(role.FloatingTextList.length!=0){
                newFloatingTextList=newFloatingTextList.concat(role.FloatingTextList);
            }
        })
        this.FloatingTextList=newFloatingTextList;
       
        this.checkFloatingTextViewNum();

        for(let i=0;i<this.FloatingTextList.length;i++){
            let floatingTextView=this.FloatingTextViewList[i];
            let floatingText=this.FloatingTextList[i];
            floatingTextView.syncPosition(floatingText.x,floatingText.y);
            floatingTextView.setText(floatingText.text);
            floatingTextView.setType(floatingText.type);
        }
    }


}