//工厂
import { FightRoleFactory } from "../Infrastructure";
import { FightBoxFactory } from "../Infrastructure";
import { FloatingTextFactory } from "../Infrastructure";
import { HitEffectFactory } from "../Infrastructure";

//系统组件
import {FightManager} from "../Domain/A_FightManager";
import { ViewSyncer } from "./Assistant/ViewSyncer";
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

    //预制体
    private FightRolePrefab;
    private FightBoxPrefab;
    private FloatingTextPrefab;
    private HitEffectPrefab;
    //工厂
    private FightRoleFactory;
    private FightBoxFactory;
    private FloatingTextFactory;
    private HitEffectFactory;

    //战斗管理
    private FightManager:FightManager;

    //子类
    private ViewSyncer:ViewSyncer;
    private FightData:FightData;
    private ChildSyncLoadOver:boolean=false;

//系统接收注入
    //初始化进行注入
    initPrefabs(FightRolePrefab,FloatingTextPrefab,FightBoxPrefab,HitEffectPrefab){
        this.FightRolePrefab=FightRolePrefab;
        this.FloatingTextPrefab=FloatingTextPrefab;
        this.FightBoxPrefab=FightBoxPrefab;
        this.HitEffectPrefab=HitEffectPrefab;

        this.initFactory();
    }
    //接收预制体注入后，建立工厂
    initFactory(){
        this.FightRoleFactory=new FightRoleFactory(this.FightRolePrefab);
        this.FightBoxFactory=new FightBoxFactory(this.FightBoxPrefab);
        this.FloatingTextFactory=new FloatingTextFactory(this.FloatingTextPrefab);
        this.HitEffectFactory=new HitEffectFactory(this.HitEffectPrefab);
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
        this.ViewSyncer.BeginSyncRole();
    }


//战斗系统提示回调 
    fightBeginCB(){
        HintPopApp.instance.createHintPop("战斗开始");
    }
    fightOverCB(){
        HintPopApp.instance.createHintPop("战斗结束");
    }

//创建战斗系统
    createFightSystem(BoardNode){
        this.buildFightManager();
        this.buildViewSyncer(BoardNode);
        this.buildFightData();
    }
    //建立战斗管理数据体
    buildFightManager(){
        this.FightManager= new FightManager(this.fightBeginCB.bind(this),this.fightOverCB.bind(this));
    }
    //建立同步子类
    buildViewSyncer(BoardNode){
        //传入工厂等，子类分担工作
        this.ViewSyncer=new ViewSyncer(this.FightManager,this.FightRoleFactory,this.FloatingTextFactory,this.FightBoxFactory,this.HitEffectFactory,BoardNode);
        this.ChildSyncLoadOver=true;
    }
    //建立战斗数据获取类
    buildFightData(){
        this.FightData=new FightData(DataBaseService.instance);
    }



    update(dt:number){
        if(this.ChildSyncLoadOver==true){
            // this.FightRoleManager.update(dt);
            this.ViewSyncer.update(dt);
        }
    }



}