import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import {Prefab} from 'cc';

import { FightApp } from '../Application/FightApp';

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
    CreateButton:Node=null;

    private FightApp:FightApp;

    private dtTime=1;

    FightBoardInit:boolean=false;

    start() {
        this.FightApp=FightApp.instance;
        this.FightApp.initPrefabs(this.FightRolePrefab,this.FloatingTextPrefab,this.FightBoxPrefab,this.HitEffectPrefab);
        // this.FightApp.createFightRole(this.FightBoardNode);

        this.CreateButton.on(Node.EventType.TOUCH_END,this.onCreateButtonClick,this);
    }

    onCreateButtonClick(){
        if(this.FightBoardInit==false){
            this.FightApp.createFightSystem(this.FightBoardNode);
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


