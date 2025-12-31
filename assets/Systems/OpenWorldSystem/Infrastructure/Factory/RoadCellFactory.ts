import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
// import { RoleBoxView } from "../View/RoleBoxView"
// import { FormationRoleView } from "../View/FormationRoleView"
// import { FormationBoxView } from "../View/FormationBoxView"
import { L_RoadCell } from "../View/L_RoadCell";
import { M_RoadCell } from '../View/M_RoadCell';
import { S_RoadCell } from '../View/S_RoadCell';


export class RoadCellFactory{

    constructor(LPrefab:Prefab,MPrefab:Prefab,SPrefab:Prefab){
        this.LPrefab=LPrefab;
        this.MPrefab=MPrefab;
        this.SPrefab=SPrefab;
        this.PoolManager=PoolManager.instance;
    }

    LPrefab:Prefab;
    MPrefab:Prefab;
    SPrefab:Prefab;
    PoolManager:PoolManager;

    start() {
        this.PoolManager=PoolManager.instance;
    }

    getLView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.LPrefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(L_RoadCell);
        return View;
    }
    recycleLView(View:L_RoadCell){
        this.PoolManager.put(View.node);
    }

    getMView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.MPrefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(M_RoadCell);
        return View;
    }
    recycleMView(View:M_RoadCell){
        this.PoolManager.put(View.node);
    }

    getSView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.SPrefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(S_RoadCell);
        return View;
    }
    recycleSView(View:S_RoadCell){
        this.PoolManager.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


