

import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
// const { ccclass, property } = _decorator;

// import { PoolManager } from '../../../Infrastructure';
import { PoolManager } from '../../../GlobalService';
import {WeaponBoxView} from '../View/WeaponBoxView'; 


export class WeaponBoxViewFactory{


    // @property(Prefab)
    // WeaponBoxViewPrefab:Prefab;
    constructor(WeaponBoxViewPrefab:Prefab){
        this.WeaponBoxViewPrefab=WeaponBoxViewPrefab;
        this.PoolManager=PoolManager.instance;
    }

    WeaponBoxViewPrefab:Prefab;
    PoolManager:PoolManager;

    start() {
        this.PoolManager=PoolManager.instance;
    }

    getWeaponBoxView(ParentNode:Node){
        let WeaponBoxViewNode=this.PoolManager.get(this.WeaponBoxViewPrefab,ParentNode);
        let myWeaponBoxView=WeaponBoxViewNode.getComponent(WeaponBoxView);
        return myWeaponBoxView;
    }

    recycle(WeaponBoxView:WeaponBoxView){
        this.PoolManager.put(WeaponBoxView.node);
    }

    update(deltaTime: number) {
        
    }
}


