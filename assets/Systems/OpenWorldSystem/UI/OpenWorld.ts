import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Prefab} from 'cc';

// import { Move } from './Assistant/Move';1
import { RoadCellFactory } from '../Infrastructure';
import { RoadDotFactory } from '../Infrastructure';
import { NpcFactory } from '../Infrastructure';

import { Move } from './Assistant/Move';
import { Message } from './Assistant/Message';
import { Npc } from './Assistant/Npc';

import { NpcPop } from './Assistant/NpcPop';


import { MapApp } from '../Application/MapApp';

type event={
    callFrom:string,
    type:string,
    data:any
}

@ccclass('OpenWorldEntry')
export class OpenWorldEntry extends Component {

    @property(Prefab)
    LRoadViewPrefab:Prefab;
    @property(Prefab)
    MRoadViewPrefab:Prefab;
    @property(Prefab)
    SRoadViewPrefab:Prefab;
    @property(Prefab)
    RoadDotViewPrefab:Prefab;

    @property(Node)
    MoveBoardNode:Node;
    @property(Node)
    CellRoadNode:Node;

    @property(Prefab)
    NpcViewPrefab:Prefab;
    @property(Node)
    NpcNode:Node;

    @property(Node)
    MessageLabelNode:Node;

    @property(Node)
    NpcPopEntryNode:Node;

    RoadCellFactory:RoadCellFactory;
    RoadDotFactory:RoadDotFactory;
    NpcFactory:NpcFactory;


    MoveAt:Move;
    MessageAt:Message;
    NpcAt:Npc;

    NpcPopEntry:NpcPop;

    MapApp:MapApp;


    start() {

        this.MapApp=MapApp.instance;
        this.MapApp.initMapEntry(this);
    
        this.RoadCellFactory=new RoadCellFactory(this.LRoadViewPrefab,this.MRoadViewPrefab,this.SRoadViewPrefab);
        this.RoadDotFactory=new RoadDotFactory(this.RoadDotViewPrefab);
        this.NpcFactory=new NpcFactory(this.NpcViewPrefab);

        this.MoveAt=new Move(this.RoadCellFactory,this.RoadDotFactory,this.MoveBoardNode,this.CellRoadNode);
        this.MoveAt.init(this.MapApp);

        this.MessageAt=new Message(this.MessageLabelNode);

        this.NpcAt=new Npc(this.NpcFactory,this.NpcNode);
        this.NpcAt.init(this.EventBus.bind(this));

        this.NpcPopEntry=this.NpcPopEntryNode.getComponent(NpcPop);

        // this.MapApp=MapApp.instance;
    }

    EventBus(event:event){
        if(event.callFrom=="Npc"){
            if(event.type=="NpcClick"){
                this.MapApp.NpcClick();
            }
        }
    }

    MoveCellClick(x:number,y:number){
        this.MapApp.MoveCellClick({x,y});
    }

    buildMoveCells(rangeMap:Map<string,string>){
        this.MoveAt.buildMoveCellsView(rangeMap);
    }

    buildNpc(){
        this.NpcAt.buildEnemyNpc();
    }

    addMessage(msg:string){
        this.MessageAt.addMessage(msg);
    }

    openNpcPop(){
        this.NpcPopEntry.open();
    }

    update(deltaTime: number) {
        
    }
}


