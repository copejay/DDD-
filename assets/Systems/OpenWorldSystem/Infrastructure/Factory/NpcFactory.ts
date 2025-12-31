import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';

// import { RoadDot } from '../View/RoadDot';
import { Npc } from '../View/Npc';


export class NpcFactory{

    constructor(Prefab:Prefab){
        this.Prefab=Prefab;
        this.PoolManager=PoolManager.instance;
    }

    Prefab:Prefab;
    PoolManager:PoolManager;

    getView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.Prefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(Npc);
        return View;
    }

    recycleView(View:Npc){
        this.PoolManager.put(View.node);
    }
}