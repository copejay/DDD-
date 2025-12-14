
import { FightRoleFactory } from "../Infrastructure";
import { FightBoxFactory } from "../Infrastructure";

import { FloatingTextFactory } from "../Infrastructure";

import { FightRoleView } from "../Infrastructure/";
import { FloatingTextView } from "../Infrastructure";

// import { FightRole } from "../Domain/FightRole";
import { FloatingText } from "../Domain/FloatingText";

// import { FightBoard } from "../Domain/FightBoard";
import { FightRoleManager } from "../Domain/FightRoleManager";

import { ChildSync } from "./ChildSync";

import {Node, Prefab} from 'cc';

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
    //工厂
    private FightRoleFactory;
    private FightBoxFactory;
    private FloatingTextFactory;

    //角色视图，列表
    // private FightRoleViewList:FightRoleView[]=[];
    // private FloatingTextViewList:FloatingTextView[]=[];
    //角色管理
    private FightRoleManager:FightRoleManager;
    //子类
    private ChildSync:ChildSync;
    private ChildSyncLoadOver:boolean=false;

    //初始化进行注入
    initPrefabs(FightRolePrefab,FloatingTextPrefab,FightBoxPrefab){
        this.FightRolePrefab=FightRolePrefab;
        this.FloatingTextPrefab=FloatingTextPrefab;
        this.FightBoxPrefab=FightBoxPrefab;
        this.initFactory();
    }
    initFightRolePrefab(FightRolePrefab){
        this.FightRolePrefab=FightRolePrefab;
    }
    initFloatingTextPrefab(FloatingTextPrefab){
        this.FloatingTextPrefab=FloatingTextPrefab;
    }
    //接收预制体注入后，建立工厂
    initFactory(){
        this.FightRoleFactory=new FightRoleFactory(this.FightRolePrefab);
        this.FightBoxFactory=new FightBoxFactory(this.FightBoxPrefab);
        this.FloatingTextFactory=new FloatingTextFactory(this.FloatingTextPrefab);
    }
    //建立角色管理
    initFightRoleManager(){
        this.FightRoleManager= new FightRoleManager();
    }

    //创建角色面板
    createFightRole(BoardNode){
        this.initFightRoleManager();
        this.createChildSync(BoardNode);
    }

    //建立同步子类
    createChildSync(BoardNode){
        //传入工厂等，子类分担工作
        this.ChildSync=new ChildSync(this.FightRoleManager,this.FightRoleFactory,this.FightBoxFactory,BoardNode);
        this.ChildSyncLoadOver=true;
    }


    // createFloatingText(parentNode:Node){
    //     let floatingTextView=this.FloatingTextFactory.get(parentNode);
    //     this.FloatingTextViewList.push(floatingTextView);
    // }


    update(dt:number){
        if(this.ChildSyncLoadOver==true){
            this.FightRoleManager.update(dt);
            this.ChildSync.update(dt);
        }
    }



}