import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import {Prefab} from 'cc';

import { ViewSyncer } from './Assistant/ViewSyncer';

import { FightApp } from '../Application/FightApp';

//工厂
import { FightRoleFactory } from "../Infrastructure";
import { FightBoxFactory } from "../Infrastructure";
import { FloatingTextFactory } from "../Infrastructure";
import { HitEffectFactory } from "../Infrastructure";

@ccclass('FightEntry')
export class FightEntry extends Component {

    @property(Prefab)
    FightRolePrefab:Prefab=null;

    @property(Prefab)
    FloatingTextPrefab:Prefab=null;

    @property(Prefab)
    FightBoxPrefab:Prefab=null;

    @property(Prefab)
    HitEffectPrefab:Prefab=null;

    @property(Node)
    FightBoardNode:Node=null;

    @property(Node)
    FightNode:Node=null;

    @property(Node)
    CreateButton:Node=null;

    @property(Node)
    FightSpeedNode:Node=null;

    private FightApp:FightApp;

    private dtTime=1;

    FightBoardInit:boolean=false;

    private ViewSyncer:ViewSyncer;

    private FightRoleFactory;
    private FightBoxFactory;
    private FloatingTextFactory;
    private HitEffectFactory;

    initFactory(){
        this.FightRoleFactory=new FightRoleFactory(this.FightRolePrefab);
        this.FightBoxFactory=new FightBoxFactory(this.FightBoxPrefab);
        this.FloatingTextFactory=new FloatingTextFactory(this.FloatingTextPrefab);
        this.HitEffectFactory=new HitEffectFactory(this.HitEffectPrefab);
    }

    start() {
        this.closeFightBoard();
        this.initFactory();

        this.FightApp=FightApp.instance;
        this.FightApp.initFightEntry(this);

        this.ViewSyncer=new ViewSyncer(this.FightRoleFactory,this.FloatingTextFactory,this.FightBoxFactory,this.HitEffectFactory,this.FightBoardNode);

        this.CreateButton.on(Node.EventType.TOUCH_END,this.onCreateButtonClick,this);
        this.FightSpeedNode.on(Node.EventType.TOUCH_END,this.FightSpeedClick,this);
    }

    Sync(FightRoleList,HitEffectList,BoardBoxList){
        this.ViewSyncer.sync(FightRoleList,HitEffectList,BoardBoxList)
    }

    closeFightBoard(){
        this.FightNode.active=false;
    }

    openFightBoard(){
        console.log(`FightEntry: 战斗面板开启函数调用!`);
        this.FightNode.active=true;
    }

    FightSpeedClick(){
        this.FightApp.FightSpeedClick();
    }

    onCreateButtonClick(){
        if(this.FightBoardInit==false){
            this.FightApp.buildFightSystem();
            this.FightBoardInit=true;
            this.FightApp.NewFight();
        }else{
            this.FightApp.NewFight();
        }
    }

    update(deltaTime: number) {
        // console.log(`FightEntry:调用update`);
        this.FightApp.update(deltaTime);
        this.dtTime-=deltaTime;
        if(this.dtTime<=0){
            this.dtTime=1;
            // console.log(`FightEntry:${1},1秒钟`);
        }
    }
}


