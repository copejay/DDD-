

import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
// const { ccclass, property } = _decorator;

// import { PoolManager } from '../../../Infrastructure';
import { PoolManager } from '../../../GlobalService';
import { ItemBoxView } from "../View/ItemBoxView"


export class ItemBoxViewFactory{


    // @property(Prefab)
    // ItemBoxViewPrefab:Prefab;
    constructor(ItemBoxViewPrefab:Prefab){
        this.ItemBoxViewPrefab=ItemBoxViewPrefab;
        this.PoolManager=PoolManager.instance;
    }

    ItemBoxViewPrefab:Prefab;
    PoolManager:PoolManager;

    start() {
        this.PoolManager=PoolManager.instance;
    }

    getItemBoxView(ParentNode:Node){
        let ItemBoxViewNode=this.PoolManager.get(this.ItemBoxViewPrefab,ParentNode);
        let myItemBoxView=ItemBoxViewNode.getComponent(ItemBoxView);
        return myItemBoxView;
    }

    recycle(ItemBoxView:ItemBoxView){
        this.PoolManager.put(ItemBoxView.node);
    }

    update(deltaTime: number) {
        
    }
}


