
import { PoolManager } from "../../../GlobalService";

import {Node,Prefab} from 'cc';

import { HitEffectView } from "../View/HitEffectView";

export class HitEffectFactory{

    private poolManager:PoolManager;
    private FloatingTextPrefab:Prefab;

    constructor(FloatingTextPrefab:Prefab){
        this.FloatingTextPrefab=FloatingTextPrefab;
        this.poolManager=PoolManager.instance;
    }

    get(parentNode:Node){
        let prefabNode=this.poolManager.get(this.FloatingTextPrefab,parentNode);
        let View=prefabNode.getComponent(HitEffectView);

        return View;
    }
    

    recycle(floatingTextView:HitEffectView){
        this.poolManager.put(floatingTextView.node);
    }

}