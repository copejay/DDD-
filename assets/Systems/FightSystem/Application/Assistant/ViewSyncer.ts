
import {RoleViewSyncer} from './ViewSyncerAt/RoleViewSyncer';
import { HitEffectSyncer } from './ViewSyncerAt/HitEffectSyncer';

export class ViewSyncer{


    private FightManager;

    //数据体列表
    // private FightRoleList;
    private FloatingTextList=[];
    // private HitEffectList=[];
    //视图列表
    // private FightRoleViewList=[];
    private FightBoxViewList=[];
    private FloatingTextViewList=[];
    // private HitEffectViewList=[];

    private BoardNode;
    //视图工厂列表
    private FightBoxFactory;
    private FightRoleFactory;
    private FloatingTextFactory;
    private HitEffectFactory;

    //数据体和视图，构建完成
    private InitOver:boolean=false;

    private RoleAt:RoleViewSyncer;
    private HitEffectAt:HitEffectSyncer;

    constructor(FightManager,FightRoleFactory,FloatingTextFactory,FightBoxFactory,HitEffectFactory,BoardNode){
        //传入数据体
        this.FightManager=FightManager;
       //传入工厂
        this.FightRoleFactory=FightRoleFactory;
        this.FloatingTextFactory=FloatingTextFactory;
        this.FightBoxFactory=FightBoxFactory;
        this.HitEffectFactory=HitEffectFactory;
        this.BoardNode=BoardNode;

        this.RoleAt=new RoleViewSyncer(this.FightManager,this.FightRoleFactory,this.BoardNode);
        this.HitEffectAt=new HitEffectSyncer(this.BoardNode,this.HitEffectFactory,this.RoleAt);

        this.BuildBoardView();
        this.SyncBoardCell();
    }

//核心方法
    BeginSyncRole(){
        this.RoleAt.buildRoleList();
        // this.FightRoleList=this.FightManager.exportRoleList();
        this.InitOver=true;
    }

    //角色运行
    // RoleUpdate(dt:number){
    //     this.FightRoleList.forEach((role)=>{
    //         role.update(dt);
    //     })
    // }

    update(dt){
        if(this.InitOver==true){
            // this.RoleUpdate(dt);
            this.RoleAt.Update(dt);
            this.RoleAt.Sync();
            // this.SyncRole();
            this.SyncFloatingText();
            // this.SyncHitEffect();
            this.HitEffectAt.Sync();
        }
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
    SyncBoardCell(){
        let BoardBoxList=this.FightManager.exportBoardBoxList();
        let TotalLength=BoardBoxList.length;
        for(let i=0;i<TotalLength;i++){
            let fightBoxView=this.FightBoxViewList[i];
            let fightBox=BoardBoxList[i];
            fightBoxView.syncPosition(fightBox.x,fightBox.y);
        }
    }

//视图数量管理方法
    //角色视图数量
    // checkRoleViewNum(){
    //     this.FightRoleList=this.FightManager.exportRoleList();

    //     let TotalLength=this.FightRoleList.length;

    //     let ViewLength=this.FightRoleViewList.length;
    //     let Num=TotalLength-ViewLength;
    //     if(Num==0){
    //         return
    //     }else if(Num<0){
    //         this.deleteRoleView(-Num);
    //     }else if(Num>0){
    //         this.addRoleView(Num);
    //     }
    // }
    // addRoleView(Num){
    //     for(let i=0;i<Num;i++){
    //         let fightRoleView=this.FightRoleFactory.get(this.BoardNode);
    //         this.FightRoleViewList.push(fightRoleView);
    //     } 
    // }
    // deleteRoleView(Num){
    //     for(let i=0;i<Num;i++){
    //         let view=this.FightRoleViewList.pop();
    //         this.FightRoleFactory.recycle(view);
    //     }  
    // }

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

    //对齐受击特效
    // checkHitEffectViewNum(){
    //     let TotalLength=this.HitEffectList.length;
    //     let ViewLength=this.HitEffectViewList.length;
    //     let Num=TotalLength-ViewLength;
    //     if(Num==0){
    //         return
    //     }else if(Num<0){
    //         this.deleteHitEffectView(-Num);
    //     }else if(Num>0){
    //         this.addHitEffectView(Num);
    //     }
    // }

    // addHitEffectView(Num){
    //     for(let i=0;i<Num;i++){
    //         let hitEffectView=this.HitEffectFactory.get(this.BoardNode);
    //         this.HitEffectViewList.push(hitEffectView);
    //     } 
    // }
    // deleteHitEffectView(Num){
    //     for(let i=0;i<Num;i++){
    //         let view=this.HitEffectViewList.pop();
    //         this.HitEffectFactory.recycle(view);
    //     }  
    // }


//数据结合视图进行同步
    //同步角色
    // SyncRole(){
    //     this.checkRoleViewNum();
    //     let TotalLength=this.FightRoleList.length;
    //     for(let i=0;i<TotalLength;i++){
    //         let fightRoleView=this.FightRoleViewList[i];
    //         let fightRole=this.FightRoleList[i];

    //         fightRoleView.syncPosition(fightRole.x,fightRole.y);
    //         fightRoleView.syncHpBar(fightRole.Hp,fightRole.maxHp);
    //         fightRoleView.setName(fightRole.name);
    //         fightRoleView.setLevel(fightRole.level);
    //         fightRoleView.syncVisual(fightRole.classType,fightRole.side);
    //     }
    // }

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

    // //同步受击特效
    // SyncHitEffect(){
    //     let newHitEffectList=[];
    //     // this.FightRoleList.forEach((role)=>{
    //     this.RoleAt.RoleList.forEach((role)=>{
    //         if(role.HitEffectList.length!=0){
    //             newHitEffectList=newHitEffectList.concat(role.HitEffectList);
    //         }
    //     })
    //     this.HitEffectList=newHitEffectList;
       
    //     this.checkHitEffectViewNum();

    //     for(let i=0;i<this.HitEffectList.length;i++){
    //         console.log(`FightSystem-App-ViewSyncer:受击特效开始同步,特效列表长度${this.HitEffectViewList.length}`);
    //         let HitEffectView=this.HitEffectViewList[i];
    //         let HitEffect=this.HitEffectList[i];
    //         HitEffectView.setPosition(HitEffect.x,HitEffect.y);
    //         HitEffectView.setEffect(HitEffect.EffectName,HitEffect.EffectType);
    //         // HitEffectView.setText(HitEffect.text);
    //     }
    // }


}