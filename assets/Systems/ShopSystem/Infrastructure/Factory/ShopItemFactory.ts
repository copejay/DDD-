import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';

//所有的工厂类都是一样的，只是在提取的View这里做出一个限制
//其它的命名都是可用复用，需要改动的地方就变少了
import { ShopItemView } from "../View/ShopItemView"


export class ShopItemViewFactory{

    Prefab:Prefab;
    PoolManager:PoolManager;

    constructor(Prefab:Prefab){
        this.Prefab=Prefab;
        this.PoolManager=PoolManager.instance;
    }

    start() {
        this.PoolManager=PoolManager.instance;
    }

    getView(ParentNode:Node){
        let ViewNode=this.PoolManager.get(this.Prefab,ParentNode);
        let View=ViewNode.getComponent(ShopItemView);
        return View;
    }

    recycle(View:ShopItemView){
        this.PoolManager.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


