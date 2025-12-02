import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
// const { ccclass, property } = _decorator;

import { PoolManager } from '../../../Infrastructure';
import { RoleBoxView } from "../View/RoleBoxView"


export class RoleBoxViewFactory{


    // @property(Prefab)
    // RoleBoxViewPrefab:Prefab;
    constructor(RoleBoxViewPrefab:Prefab){
        this.RoleBoxViewPrefab=RoleBoxViewPrefab;
        this.PoolManager=PoolManager.instance;
    }

    RoleBoxViewPrefab:Prefab;
    PoolManager:PoolManager;

    start() {
        this.PoolManager=PoolManager.instance;
    }

    getRoleBoxView(ParentNode:Node){
        let RoleBoxViewNode=this.PoolManager.get(this.RoleBoxViewPrefab,ParentNode);
        let myRoleBoxView=RoleBoxViewNode.getComponent(RoleBoxView);
        return myRoleBoxView;
    }

    recycle(RoleBoxView:RoleBoxView){
        this.PoolManager.put(RoleBoxView.node);
    }

    update(deltaTime: number) {
        
    }
}


