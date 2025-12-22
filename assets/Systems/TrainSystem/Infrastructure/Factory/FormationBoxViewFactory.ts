import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
// import { RoleBoxView } from "../View/RoleBoxView"
// import { FormationRoleView } from "../View/FormationRoleView"
import { FormationBoxView } from "../View/FormationBoxView"


export class FormationBoxViewFactory{

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
        let View=RoleBoxViewNode.getComponent(FormationBoxView);
        return View;
    }

    recycle(View:FormationBoxView){
        this.PoolManager.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


