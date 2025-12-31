import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';

import { RoadDot } from '../View/RoadDot';



export class RoadDotFactory{

    constructor(Prefab:Prefab){
        this.Prefab=Prefab;
        this.PoolManager=PoolManager.instance;
    }

    Prefab:Prefab;
    PoolManager:PoolManager;

    getView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.Prefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(RoadDot);
        return View;
    }

    recycleView(View:RoadDot){
        this.PoolManager.put(View.node);
    }
}