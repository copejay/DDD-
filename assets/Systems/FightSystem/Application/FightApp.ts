

//系统组件
import {FightManager} from "../Domain/A_FightManager";
// import { ViewSyncer } from "./Assistant/ViewSyncer";
import { FightData } from "./Assistant/FightData";

//其它系统服务
import { HintPopApp } from "../../HintPopSystem/Application/HintPopApp";
import { DataBaseService } from "../../GlobalService";

export class FightApp{

    private static _instance:FightApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new FightApp();
        }
        return this._instance;
    }

    //战斗管理
    private FightManager:FightManager;

    //战斗前端UI
    private FightEntry;

    //子类
    // private ViewSyncer:ViewSyncer;
    private FightData:FightData;
    // private ChildSyncLoadOver:boolean=false;
    private FightRuing:boolean=false;

    initFightEntry(FightEntry){
        this.FightEntry=FightEntry;
    }

//战斗系统建立后，获取数据开始新战斗
    NewFight(){
        let Formation;
        if(this.FightData.DataOk()){
            Formation=this.FightData.getFormation();
        }else{
            HintPopApp.instance.createHintPop("非法战斗阵容！");
            return;
        }
        this.FightManager.NewFight(Formation);
        // this.FightRuing=true;
        // this.ViewSyncer.BeginSyncRole();
    }

    //设置战斗速度
    FightSpeedClick(){
        let speed=1;
        if(this.FightManager.FightSpeed==1){
            speed=3;
        }
        this.setFightSpeed(speed);
    }

    setFightSpeed(num){
        this.FightManager.setFightSpeed(num);
    }


//战斗系统提示回调 
    fightBeginCB(){
        HintPopApp.instance.createHintPop("战斗开始");
        this.FightRuing=true;
        this.FightEntry.openFightBoard();
    }
    fightOverCB(){
        HintPopApp.instance.createHintPop("战斗结束");
        this.FightRuing=false;
        this.FightEntry.closeFightBoard();
    }

//创建战斗系统
    buildFightSystem(){
        this.buildFightManager();
        // this.buildViewSyncer(BoardNode);
        this.buildFightData();
    }
    //建立战斗管理数据体
    buildFightManager(){
        this.FightManager= new FightManager(this.fightBeginCB.bind(this),this.fightOverCB.bind(this));
    }
    //建立战斗数据获取类
    buildFightData(){
        this.FightData=new FightData(DataBaseService.instance);
    }



    update(dt:number){
        if(this.FightRuing==true){
            this.FightManager.Update(dt);
            let Roles=this.FightManager.exportRoleList();
            let HintEffects=this.FightManager.exportHitEffectList();
            let BoardBoxList=this.FightManager.exportBoardBoxList();
            this.FightEntry.Sync(Roles,HintEffects,BoardBoxList);
        }
    }



}