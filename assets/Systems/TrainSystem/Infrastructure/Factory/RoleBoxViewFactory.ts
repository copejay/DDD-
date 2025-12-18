import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
import { RoleBoxView } from "../View/RoleBoxView"


export class RoleBoxViewFactory{

    constructor(Prefab:Prefab){
        this.Prefab=Prefab;
        this.PoolManager=PoolManager.instance;
    }

    Prefab:Prefab;
    PoolManager:PoolManager;

    start() {
        this.PoolManager=PoolManager.instance;
    }

    getView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.Prefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(RoleBoxView);
        return View;
    }

    recycle(View:RoleBoxView){
        this.PoolManager.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


